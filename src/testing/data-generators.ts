import { randEmail, randUuid, randPassword } from "@ngneat/falso";

const generateUser = () => ({
  id: randUuid() + Math.random(),
  email: randEmail(),
  password: randPassword(),
  createdAt: Date.now(),
});

export const createUser = <T extends Partial<ReturnType<typeof generateUser>>>(
  overrides?: T,
) => {
  return { ...generateUser(), ...overrides };
};
