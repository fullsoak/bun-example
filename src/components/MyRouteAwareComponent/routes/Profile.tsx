type Props = {
  blah?: string;
};

export const Profile = ({ blah }: Props) => (
  <main>
    <h1>Profile {blah}</h1>
    <ol>
      <li>
        <a href="/app/profiles">Profiles</a>
      </li>
      <li>
        <a href="/app">Home</a>
      </li>
    </ol>
  </main>
);
