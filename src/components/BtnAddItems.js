import { Button } from "react-bootstrap";
import { useNavigation } from "react-router-dom";

const BtnAddItems = ({ text }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Button
      type="submit"
      className="mx-auto mb-5"
      style={{ backgroundImage: "linear-gradient(to left bottom, #4b93fc, #6184ff, #8370ff, #a853fc, #cc12eb)"}}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className=""></span>
          sending...
        </>
      ) : (
        text || "submit"
      )}
    </Button>
  );
};
export default BtnAddItems;
