const mongoose = require('mongoose');

// const feedbackSchema = new mongoose.Schema({
//   // Feedback schema remains the same
// });

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  author : {
    type : String,
    required : true,
  },
//   description: {
//     type: String,
//     required: true,
//   },
  videos: [
    {
      // title: {
      //   type: String,
      //   required: true,
      // },
      // description: {
      //   type: String,
      //   required: true,
      // },
      videoUrl: {
        type: String,
        required: false,
      },

      videoHandle : {
        type : String
      }
      
      // thumbnailUrl: {
      //   type: String,
      //   // required: true,
      // },
    },
  ],
  

  briefs: [
    {
      chapter: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  ebook: {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      enum: ['PDF', 'ePub', 'other'], // You can customize the supported formats
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      // required: true,
    },
    bookmarks: [
      {
        pageNumber: {
          type: Number,
          required: true,
        },
        label: {
          type: String,
          required: true,
        },
        note: String,
      },
    ],
    highlights: [
      {
        pageNumber: {
          type: Number,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
      },
    ],
  },
  flashCards: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
      isMastered: {
        type: Boolean,
        default: false,
      },
    },
  ],
  multipleChoiceQuestions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: {
        type: [String],
        required: true,
      },
      correctOption: {
        type: String,
        required: true,
      },
    },
  ],

  feedback: [ {
  username: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
