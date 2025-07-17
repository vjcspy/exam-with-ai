import { concatMap, from, Subscription, timer } from 'rxjs';

import { setJob } from '@/lib/redux/slices/jobSlice';
import { AppDispatch } from '@/lib/redux/store';
import { Job } from '@/lib/types/jobs';
import { fetchData } from '@/lib/utils';

class JobProcessor {
  private subscription: Subscription | undefined;
  private dispatch: AppDispatch | undefined;

  setDispatch(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  start() {
    if (this.subscription) {
      return;
    }
    this.subscription = timer(0, 30 * 1000)
      .pipe(concatMap(() => from(this.process())))
      .subscribe({
        next(x) {
          console.log('got value ', x);
        },
        error(err) {
          console.error('something wrong occurred: ' + err);
        },
        complete() {
          console.log('done');
        },
      });
  }

  private async process(): Promise<any> {
    console.log('Processing job');
    const [job, error] = await fetchData<Job>(`/api/jobs`);

    if (error) {
      console.error('Error fetching job:', error);
      return null;
    }

    // Save the job to Redux state if dispatch is available
    if (this.dispatch && job) {
      this.dispatch(setJob(job));
    }

    switch (job.status) {
      case 'AGENT_SCREEN_CAPTURE':
        break;
    }
    return job;
  }
}

export const jobProcessor = new JobProcessor();
