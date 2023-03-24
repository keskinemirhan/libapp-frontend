export class UpdateBookDto {
  constructor(
    public bookId: number,
    public name?: string,
    public categories?: Array<string>
  ) {}
}

export class CreateBookDto {
  constructor(public name?: string, public categories?: Array<any>) {}
}

export class UpdateCategoryDto {
  constructor(
    public id: number,
    public name?: string,
    public topCategory?: string
  ) {}
}

export class CreateCategoryDto {
  constructor(public name: string, public topCategory: string) {}
}

export class CreateUserDto {
  constructor(
    public email: string,
    public username: string,
    public password: string
  ) {}
}

export class LoginUserDto {
  constructor(public email: string, public password: string) {}
}

export class UpdateUserDto {
  constructor(
    public username: string,
    public email?: string,
    public password?: string
  ) {}
}
