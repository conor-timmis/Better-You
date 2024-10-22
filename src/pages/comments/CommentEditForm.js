import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/CommentCreateEditForm.module.css";
import StarRating from "../../components/StarRating";

function CommentEditForm(props) {
  const { id, content, rating, setShowEditForm, setComments } = props;

  const [formContent, setFormContent] = useState(content);
  const [formRating, setFormRating] = useState((rating || 0) * 20);
  
  /* 
    Handles changes to form input field
  */
  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  /* 
    Handles the edit comment form input submit
    Date of updated comment is reset to the 
    new time updated
  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const adjustedRating = Math.round(formRating / 20);

      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
        rating: adjustedRating,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                rating: adjustedRating,
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.CommentEntryForm}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <StarRating rating={formRating} setRating={setFormRating} />
      <div className="text-right">
        <button
          className={styles.CancelCommentEditButton}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          Cancel
        </button>
        <button
          className={styles.CommentButton}
          disabled={!formContent.trim()}
          type="submit"
        >
          Save
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;