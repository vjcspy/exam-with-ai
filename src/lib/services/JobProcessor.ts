import { concatMap, from, Subscription, timer } from 'rxjs';

import { IJob, Job } from '@/lib/model/job';
import { setJob } from '@/lib/redux/slices/jobSlice';
import { AppDispatch } from '@/lib/redux/store';
import { JobStatus } from '@/lib/types/job';
import { fetchData, parseToModel } from '@/lib/utils';
import { CommonValue } from '@/lib/values/common.value';

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
    this.subscription = timer(0, 5 * 1000)
      .pipe(concatMap(() => from(this.process())))
      .subscribe({
        next(_) {
          // console.log('got value ', x);
        },
        error(err) {
          console.error('something wrong occurred: ' + err);
        },
        complete() {
          console.log('done');
        },
      });
  }

  private async process(): Promise<IJob | null> {
    // console.log('Processing job');
    // Step 1: Fetch raw data
    const [rawData, fetchError] = await fetchData(CommonValue.getJobUrl());

    if (fetchError) {
      console.error('Error fetching job:', fetchError);
      return null;
    }

    // Step 2: Parse and validate the data
    const [job, parseError] = await parseToModel<IJob>(rawData, Job);

    if (parseError) {
      console.error('Error parsing job data:', parseError);
      return null;
    }

    // Store the job in Redux
    if (this.dispatch && job) {
      this.dispatch(setJob(job.toJSON()));
    }

    switch (job.status) {
      case JobStatus.AGENT_SCREEN_CAPTURE:
        break;
    }
    return job;
  }
}

export const jobProcessor = new JobProcessor();
