import type { FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";

type Props = {
  baz: number;
}

export const MyOtherComponent: FunctionComponent<Props> = ({ baz }: Props) => {
  useEffect(() => {
    alert(`MyOtherComponent mounted with initial props baz=${baz}`);
  }, []);

  return <section style={{ padding: "1rem" }}>
    <h2>MyOtherComponent</h2>
    <span>props 'baz' is {baz}</span>
  </section>;
};
