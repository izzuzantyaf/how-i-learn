export type LearningStyleConstructorProps = Pick<
  LearningStyle,
  'id' | 'name' | 'created_at' | 'updated_at'
>;

export class LearningStyle {
  id: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(props: LearningStyleConstructorProps) {
    Object.assign(this, props);
  }
}
