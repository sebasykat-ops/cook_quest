import { UseCase } from '../../../shared-kernel/application/use-case';
import { Rating } from '../../domain/value-objects/rating.value-object';
import { UserRecipeProgressRepository } from '../../domain/repositories/user-recipe-progress.repository';
import { RateRecipeDto } from '../dto/rate-recipe.dto';

export class RateRecipeUseCase implements UseCase<RateRecipeDto, void> {
  constructor(private readonly userRecipeProgressRepository: UserRecipeProgressRepository) {}

  public async execute(request: RateRecipeDto): Promise<void> {
    const userRecipeProgress = await this.userRecipeProgressRepository.findById(request.progressId);

    if (!userRecipeProgress) {
      throw new Error('User recipe progress not found');
    }

    userRecipeProgress.rateRecipe(Rating.create(request.score));
    await this.userRecipeProgressRepository.save(userRecipeProgress);
  }
}
