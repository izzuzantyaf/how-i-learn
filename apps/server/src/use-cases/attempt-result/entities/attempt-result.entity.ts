import { LearningStyle } from 'src/use-cases/learning-style/entities/learning-style.entity';

export type AttemptResultConstructorProps = Partial<
  Pick<
    AttemptResult,
    | 'id'
    | 'attempt_id'
    | 'learning_style_id'
    | 'final_cf'
    | 'created_at'
    | 'updated_at'
  >
>;

export class AttemptResult {
  id?: number;
  attempt_id: number;
  learning_style_id: string;
  learning_style?: LearningStyle;
  final_cf: number;
  created_at?: Date;
  updated_at?: Date;

  constructor(props?: AttemptResultConstructorProps) {
    Object.assign(this, props);
  }
}
