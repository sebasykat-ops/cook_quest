const missionExecutionContainerTypes = {
  missionProgressRepository: Symbol.for('MissionExecution.MissionProgressRepository'),
  advanceMissionStepUseCase: Symbol.for('MissionExecution.AdvanceMissionStepUseCase'),
  getMissionByIdUseCase: Symbol.for('MissionExecution.GetMissionByIdUseCase'),
  restartMissionUseCase: Symbol.for('MissionExecution.RestartMissionUseCase')
};

export default missionExecutionContainerTypes;
