const missionExecutionContainerTypes = {
  missionProgressRepository: Symbol.for('MissionExecution.MissionProgressRepository'),
  advanceMissionStepUseCase: Symbol.for('MissionExecution.AdvanceMissionStepUseCase')
};

export default missionExecutionContainerTypes;
