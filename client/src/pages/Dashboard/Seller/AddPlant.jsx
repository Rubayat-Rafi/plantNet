import { Helmet } from "react-helmet-async";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import { imageUpload } from "../../../api/utils";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";



const AddPlant = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()
  const [uploadImage, setUploadImage] = useState({
    image: {name: "Upload Image"},
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const category = form.category.value;
    const description = form.description.value;
    const price = parseFloat(form.price.value);
    const quantity = parseFloat(form.quantity.value);
    const image = form.image.files[0];
    //custom hook for image
    const imageURL = await imageUpload(image);

    //seller information
    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    //create plat data object
    const plantData = {
      name,
      category,
      description,
      price,
      quantity,
      imageURL,
      seller,
    };

    // sent plantData in database
    try {
      // post req
       await axiosSecure.post('/plant', plantData)
      toast.success("Data Added Successfully!");
      form.reset();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
   };

  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
        handleSubmit={handleSubmit}
        loading={loading} />
    </div>
  );
};

export default AddPlant;
