import { Expose, instanceToPlain } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * Interface defining the structure of a Job
 * This ensures Job objects are serializable for Redux
 */
export interface IJob {
  created_at: string;
  data: any;
  error_message: string | null;
  job_id: string;
  job_name: string;
  status: string;
  updated_at: string;

  toJSON(): IJob;
}

/**
 * Job class implementing IJob interface
 * Includes validation decorators and serialization methods
 */
export class Job implements IJob {
  @Expose()
  @IsDateString()
  @IsNotEmpty()
  created_at: string;

  @Expose()
  @IsOptional()
  data: any;

  @Expose()
  @IsString()
  @IsOptional()
  error_message: string | null;

  @Expose()
  @IsString()
  @IsNotEmpty()
  job_id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  job_name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  status: string;

  @Expose()
  @IsDateString()
  @IsNotEmpty()
  updated_at: string;

  /**
   * Serializes the Job instance to a plain JavaScript object
   * This ensures the Job can be safely stored in Redux
   * Uses instanceToPlain from class-transformer to respect @Expose decorators
   * @returns A plain JavaScript object representation of the Job
   */
  toJSON(): IJob {
    return instanceToPlain(this) as IJob;
  }
}
