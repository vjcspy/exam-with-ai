export class CommonValue {
  static readonly JOB_NAME = 'PBF_EXAM';
  static readonly API_BASE_URL = 'https://metan.bluestone.systems';
  static readonly URL_JOB_PATH = 'image-question-jobs';

  public static getJobUrl() {
    return `${CommonValue.API_BASE_URL}/${CommonValue.URL_JOB_PATH}/${CommonValue.JOB_NAME}`;
  }

  public static getCurrentJobImage(imageName: string) {
    return `${CommonValue.API_BASE_URL}/upload/image/${imageName}`;
  }

  public static getJobRagAIAnswerUrl() {
    return `${CommonValue.API_BASE_URL}/image-question-jobs/answer/${CommonValue.JOB_NAME}`;
  }
}
