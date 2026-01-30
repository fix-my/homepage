export type Profile = {
  name: string;
  role: string;
};

type Resource<T> = {
  read: () => T;
};

function fetchProfile(): Promise<Profile> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'Ada Lovelace', role: '수학자' });
    }, 100);
  });
}

function wrapPromise<T>(promise: Promise<T>): Resource<T> {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T;
  let error: unknown;

  const suspender = promise.then(
    (value) => {
      status = 'success';
      result = value;
    },
    (err) => {
      status = 'error';
      error = err;
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      }
      if (status === 'error') {
        throw error;
      }
      return result;
    },
  };
}

export function createProfileResource() {
  return wrapPromise(fetchProfile());
}
