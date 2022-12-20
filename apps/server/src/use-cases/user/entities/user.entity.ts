import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  isDate,
  isEmail,
  isEmpty,
  isNotEmptyObject,
  isObject,
  isString,
  maxLength,
  minLength,
} from 'class-validator';
import { ApiHideProperty } from '@nestjs/swagger';

export type UserConstructorProps = Partial<
  Pick<User, 'id' | 'name' | 'email' | 'password' | 'created_at' | 'updated_at'>
>;

export class User {
  id?: number; // id or general database identifier
  name: string;
  @Exclude()
  email: string;
  @ApiHideProperty()
  password: string;
  email_confirmed?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;

  constructor(props?: UserConstructorProps) {
    Object.assign(this, props);
  }

  /**
   * Determine name property is satisfy the validation rule or not
   * @returns True if name property is satisfy the validation rule
   */
  protected validateName(options: { forUpdatePurpose?: boolean } = {}) {
    const { forUpdatePurpose = false } = options;
    const maxNameLength = 100;
    if (forUpdatePurpose && this.name === undefined) return true;
    if (isEmpty(this.name)) return { name: 'Nama harus diisi' };
    if (!isString(this.name)) return { name: 'Nama harus bertipe string' };
    if (!maxLength(this.name, maxNameLength))
      return { name: `Nama maksimal ${maxNameLength} karakter` };
    return true;
  }

  /**
   * Determine email property is satisfy the validation rule or not
   * @returns True if email property is satisfy the validation rule
   */
  protected validateEmail(options: { forUpdatePurpose?: boolean } = {}) {
    const { forUpdatePurpose = false } = options;
    if (forUpdatePurpose && this.email === undefined) return true;
    if (isEmpty(this.email)) return { email: 'Email harus diisi' };
    if (!isString(this.email)) return { email: 'Email harus bertipe string' };
    if (!isEmail(this.email)) return { email: 'Email tidak valid' };
    return true;
  }

  /**
   * Determine password property is satisfy the validation rule or not
   * @returns True if password property is satisfy the validation rule
   */
  protected validatePassword(options: { forUpdatePurpose?: boolean } = {}) {
    const { forUpdatePurpose = false } = options;

    const minPasswordLength = 6;
    if (forUpdatePurpose && this.password === undefined) return true;
    if (isEmpty(this.password)) return { password: 'Password harus diisi' };
    if (!isString(this.password))
      return { password: 'Password harus bertipe string' };
    if (!minLength(this.password, minPasswordLength))
      return { password: `Password minimal ${minPasswordLength} karakter` };
    return true;
  }

  /**
   * Do validation to all properties against the validation rules
   * @returns True if all properties are satisfy the validation rules
   */
  validateProps(options: { forUpdatePurpose?: boolean } = {}) {
    const { forUpdatePurpose } = options;
    const validationResults = [
      this.validateName({ forUpdatePurpose }),
      this.validateEmail({ forUpdatePurpose }),
      this.validatePassword({ forUpdatePurpose }),
    ];
    const errors = validationResults.reduce(
      (error, result) => (isObject(result) ? { ...error, ...result } : error),
      {},
    );
    return isNotEmptyObject(errors) ? errors : null;
  }

  /**
   * Hash the user password
   * @returns hashed password string
   */
  async hashPassword() {
    const saltOrRounds = 10;
    this.password = await bcrypt.hash(this.password, saltOrRounds);
    return this.password;
  }

  /**
   * Compare user plain password against the hashed password
   * @param passwordToBeVerified Plain text password intended to be verified
   * @returns True if plain text password is matched
   */
  async verifyPassword(passwordToBeVerified: string) {
    return await bcrypt.compare(passwordToBeVerified, this.password);
  }

  /**
   *
   * @returns True if email_confirmed property is a date
   */
  isEmailConfirmed() {
    return isDate(this.email_confirmed);
  }
}
