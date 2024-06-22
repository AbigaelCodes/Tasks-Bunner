export interface Task {
    id: number,
    user_id: number,
    description: string,
    status: boolean,
    created_at: Date,
    completed_at: Date,
}