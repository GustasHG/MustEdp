enum LifeCycleState {
    PENDING="PENDING",
    RUNNING="RUNNING",
    TERMINATING="TERMINATING",
    TERMINATED="TERMINATED",
    SKIPPED="SKIPPED",
    INTERNAL_ERROR="INTERNAL_ERROR",
    BLOCKED="BLOCKED",
    WAITING_FOR_RETRY="WAITING_FOR_RETRY",
    QUEUED="QUEUED",
}

enum ResultState {
    SUCCESS="SUCCESS",
    FAILED="FAILED",
    TIMEDOUT="TIMEDOUT",
    CANCELED="CANCELED",
    MAXIMUM_CONCURRENT_RUNS_REACHED="MAXIMUM_CONCURRENT_RUNS_REACHED",
    UPSTREAM_CANCELED="UPSTREAM_CANCELED",
    UPSTREAM_FAILED="UPSTREAM_FAILED",
    EXCLUDED="EXCLUDED",
    SUCCESS_WITH_FAILURES="SUCCESS_WITH_FAILURES",
}

export interface JobRunResponseDto {
    job_id: number;
    run_id: number;
    creator_user_name: string;
    number_in_job: number
    state: {
      life_cycle_state: LifeCycleState;
      result_state: ResultState;
      state_message: string;
      user_cancelled_or_timedout: boolean;
      queue_reason: string;
    }
}