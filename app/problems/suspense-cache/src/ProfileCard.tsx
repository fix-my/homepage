import { createProfileResource } from './cache';

export type ProfileResource = ReturnType<typeof createProfileResource>;

export default function ProfileCard({ resource }: { resource: ProfileResource }) {
  const profile = resource.read();

  return (
    <div className="rounded-lg border p-4 bg-white">
      <p className="text-lg font-semibold">이름: {profile.name}</p>
      <p className="text-gray-600">직업: {profile.role}</p>
    </div>
  );
}
