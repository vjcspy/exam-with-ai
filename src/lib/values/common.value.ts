export class CommonValue {
  static readonly API_BASE_URL = 'https://metan.bluestone.systems';
  static readonly URL_JOB_PATH = 'image-question-jobs';

  public static getJobUrl() {
    return `${CommonValue.API_BASE_URL}/${CommonValue.URL_JOB_PATH}/PBF_EXAM`;
  }

  public static getCurrentJobImage(imageName: string) {
    return `${CommonValue.API_BASE_URL}/upload/image/${imageName}`;
  }
}
