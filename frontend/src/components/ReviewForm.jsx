import React from "react";
import { Formik, Form, FieldArray, Field} from "formik";
import Rating from "react-rating";

function ReviewForm({ handleSubmitReviewForm }) {
  const user = localStorage.getItem("token");
  const initialValues = {
    user_id: user,
    review: "",
    rating: 0,
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmitReviewForm}>
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <div className="flex gap-4">
              <img
                src="https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg"
                alt="User profile image"
                className="w-12 h-12 rounded-3xl"
              />

              <div>
                <div>
                  <label htmlFor="rating"></label>
                  <Rating
                    initialRating={values.rating}
                    onChange={(value) => setFieldValue("rating", value)}
                    emptySymbol={<span className="text-gray-400 text-lg">&#9734;</span>}
                    fullSymbol={<span className="text-yellow text-lg">&#9733;</span>}
                    className="text-3xl"
                  />
                </div>

                <div className="border-b-2 mb-8">
                  <label htmlFor="review"></label>
                  <Field
                    as="textarea"
                    id="review"
                    name="review"
                    placeholder="Write your review here"
                    className="w-96 bg-transparent resize-none focus:outline-none focus:border-transparent"
                    value={values.review}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="mx-80">
              <button
                type="submit"
                className="bg-yellow text-black font-bold py-1 px-5 rounded-full"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ReviewForm;
