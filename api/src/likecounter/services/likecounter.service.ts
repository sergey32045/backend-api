import { InjectRepository } from '@nestjs/typeorm';
import { Test } from '../../tests/models/test.entity';
import { Repository } from 'typeorm';
import { Like } from '../models/like.entity';
import { LikeIncrementDto } from '../validation/LikeIncrementDto';
import { LikeQueryDto } from '../validation/LikeQueryDto';

export class LikeCounterService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
  ) {}

  increment(data: LikeIncrementDto): Promise<Like> {
    const likeRecord = new Like();
    likeRecord.username = data.username;
    likeRecord.source_type = data.source;

    return this.likeRepository.save(likeRecord);
  }
  getCountLikes(data: LikeQueryDto): Promise<number> {
    return this.likeRepository.count({
      where: {
        source_type: data.source,
      },
    });
  }
  getLikes(data: LikeQueryDto): Promise<Like[]> {
    return this.likeRepository.find({
      where: { source_type: data.source },
      order: { id: 'DESC' },
      take: 30,
    });
  }
}
