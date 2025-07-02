import { Navbar } from '@/components/organisms';

import { RootContainerProps } from './Root.config';

const RootContainer = ({ children }: RootContainerProps) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 px-12 py-6">{children}</main>
  </div>
);

export default RootContainer;
