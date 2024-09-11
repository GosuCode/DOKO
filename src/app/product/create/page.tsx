import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createProductAction } from "./actions";

const CreateProduct = () => {
  return (
    <main>
      <h1>List your product</h1>

      <form action={createProductAction}>
        <Input
          name="name"
          placeholder="Product name"
          required
          autoComplete="off"
        />
        <Button type="submit">Submit</Button>
      </form>
    </main>
  );
};

export default CreateProduct;
