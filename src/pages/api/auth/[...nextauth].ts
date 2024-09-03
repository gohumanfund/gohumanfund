import NextAuth, { type AuthOptions } from 'next-auth';

import { authOptions } from '~/server/auth';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export default NextAuth(authOptions as AuthOptions);
