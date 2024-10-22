import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import StarRating from "../../components/StarRating";

function CommentCreateForm(props) {
  const { post, setPost, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  /*
    Handles changes to comment input field
   */
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  /*
    Handles submission of comment text input and rating
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Adjust rating scale before sending to backend
      const adjustedRating = rating / 20;
      
      const { data } = await axiosRes.post("/comments/", {
        content,
        rating: adjustedRating,
        post,
      });
  
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
  
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
      setRating(0);
    } catch (err) {
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <StarRating rating={rating} setRating={setRating} />
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default CommentCreateForm;