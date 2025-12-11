export const GET_TASKS_QUERY = `
  query Missions($input: MissionsQueryInput) {
    missions(input: $input) {
      id
      title
      description
      priority
      completed
      category
      dueDate
    }
  }
`;

export const GET_TASK_QUERY = `
  query Mission($id: ID!) {
    mission(id: $id) {
      id
      title
      description
      completed
      dueDate
      priority
      category
    }
  }
`;

export const CREATE_TASK_MUTATION = `
  mutation CreateMission($input: CreateMissionInput!) {
    createMission(input: $input) {
      mission {
        id
        title
        description
        completed
        dueDate
        priority
        category
      }
      errors
    }
  }
`;

export const UPDATE_TASK_MUTATION = `
  mutation UpdateMission($input: UpdateMissionInput!) {
    updateMission(input: $input) {
      mission {
        id
        title
        description
        completed
        dueDate
        priority
        category
      }
      errors
    }
  }
`;

export const DELETE_TASK_MUTATION = `
  mutation DeleteMission($id: ID!) {
    deleteMission(id: $id) {
      success
      errors
    }
  }
`;
