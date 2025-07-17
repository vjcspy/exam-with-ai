export class CommonValue {
  static readonly BASE_URL = 'http://localhost:8000';
  static readonly URL_JOB_PATH = 'image-question-jobs';

  public static getJobUrl() {
    return `${CommonValue.BASE_URL}/${CommonValue.URL_JOB_PATH}/PBF_EXAM`;
  }
}
