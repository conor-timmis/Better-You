import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Asset from "../../components/Asset";
import Upload from "../../assets/upload-img.png";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";

function PostCreateForm() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { title, content, image } = postData;
  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (imageInput.current.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }
  
    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };
  

  const textFields = (
    <div className="text-center">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </div>
      {errors?.title?.map((message, idx) => (
        <div className="alert alert-warning" key={idx}>
          {message}
        </div>
      ))}
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          className="form-control"
          id="content"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </div>
      {errors?.content?.map((message, idx) => (
        <div className="alert alert-warning" key={idx}>
          {message}
        </div>
      ))}
      <button
        type="button"
        className={`btn ${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </button>
      <button
        type="submit"
        className={`btn ${btnStyles.Button} ${btnStyles.Blue}`}
      >
        create
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-7 col-lg-8 py-2 p-0 p-md-2">
          <div
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <div className="form-group text-center">
              {image ? (
                <>
                  <figure>
                    <img className={appStyles.Image} src={image} alt="Post" />
                  </figure>
                  <div>
                    <label
                      className={`btn ${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </label>
                  </div>
                </>
              ) : (
                <label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </label>
              )}
              <input
                type="file"
                className="form-control-file"
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </div>
            {errors?.image?.map((message, idx) => (
              <div className="alert alert-warning" key={idx}>
                {message}
              </div>
            ))}
            <div className="d-md-none">{textFields}</div>
          </div>
        </div>
        <div className="col-md-5 col-lg-4 d-none d-md-block p-0 p-md-2">
          <div className={appStyles.Content}>{textFields}</div>
        </div>
      </div>
    </form>
  );
}

export default PostCreateForm;
