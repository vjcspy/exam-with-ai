export interface Job {
    created_at: string;
    data: any;
    error_message: string | null;
    job_id: string;
    job_name: string;
    status: string;
    updated_at: string;
}