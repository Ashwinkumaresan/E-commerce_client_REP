import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { log } from 'three/tsl';

export const ImageClassification = ({ onClose, onResult }) => {
  const navigate = useNavigate()
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const uploadImage = async (file) => {
    setImage(file);
    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      const res = await axios.post('http://10.207.58.70:8000/user/dlview/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(res.data.prediction)
      setResult(res.data.prediction);
      // ✅ send result to parent
      if (onResult) onResult(res.data.prediction);
//      navigate(`/`);
      console.log("Navigated")
    } catch (error) {
      console.error(error);
      setResult('Error: ' + (error.response?.data?.detail || 'Upload failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) uploadImage(file);
    },
    []
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) uploadImage(file);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white p-4 rounded-4 shadow-lg position-relative"
          style={{ width: '400px', maxWidth: '90%' }}
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 10 }}
        >
          {/* Close Button */}
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-3"
            onClick={onClose}
          ></button>

          <h5 className="text-center mb-3">Upload to Get Many Related Product</h5>

          {/* Drag & Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 p-4 text-center rounded-3 ${dragActive ? 'border-primary bg-light' : 'border-secondary'
              }`}
            style={{
              borderStyle: 'dashed',
              cursor: 'pointer',
              transition: '0.2s',
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="d-none"
              id="uploadInput"
            />
            <label htmlFor="uploadInput" style={{ cursor: 'pointer' }}>
              {loading ? (
                <p>Uploading...</p>
              ) : image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  width="250"
                  className="rounded-3"
                />
              ) : (
                <>
                  <i
                    className="bi bi-cloud-arrow-up"
                    style={{ fontSize: '2rem', color: '#000000ff' }}
                  ></i>
                  <p className="mt-2 mb-0">
                    Drag & Drop your image here or click to select
                  </p>
                </>
              )}
            </label>
          </div>

          {/* Result */}
          {result && (
            <motion.div
              className="alert alert-info mt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <strong>Result:</strong> {result}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
