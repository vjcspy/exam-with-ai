import {Subscription} from "rxjs";
import {Job} from "@/lib/types/jobs";

class JobProcessor {
    private subscription: Subscription | undefined;

    start() {
        if (this.subscription) {
            return;
        }

        // this.subscription =  interval(10).pipe(concatMap(fromPromise(this.process()))).subscribe(
        //      {
        //          next(x) {
        //              console.log('got value ' + x);
        //          },
        //          error(err) {
        //              console.error('something wrong occurred: ' + err);
        //          },
        //          complete() {
        //              console.log('done');
        //          },
        //      }
        //  )
        this.process();
    }

    private async process(): Promise<Job | null> {
        try {
            const jobData = await fetch('/api/jobs');
            console.log(await jobData.json());
            return await jobData.json();
        } catch (error) {
            console.error("Error processing job", error);
            return null;
        }

    }
}

export const jobProcessor = new JobProcessor();