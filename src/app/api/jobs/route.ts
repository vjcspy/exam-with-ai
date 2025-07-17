import { CommonValue } from '@/lib/values/common.value';

export async function handle() {
  const jobData = await fetch(CommonValue.getJobUrl());
  return Response.json(await jobData.json());
}

export const GET = handle;
