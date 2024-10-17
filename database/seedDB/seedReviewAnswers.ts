// database/seedDB/seedReviewAnswers.ts

import ReviewAnswer from '../models/ReviewAnswer';

const seedReviewAnswers = async () => {
  await ReviewAnswer.bulkCreate([
    {
      review_question_id: 1,
      review_id: 1,
      answer: 'Yes, the course content was very relevant and met my learning goals perfectly.',
    },
    {
      review_question_id: 2,
      review_id: 1,
      answer: 'The materials were engaging and kept me interested throughout the course.',
    },
    {
      review_question_id: 3,
      review_id: 1,
      answer: 'I would definitely recommend this course; it was well-structured and informative.',
    },
    {
      review_question_id: 1,
      review_id: 2,
      answer: 'The content was relevant, but some topics felt rushed.',
    },
    {
      review_question_id: 2,
      review_id: 2,
      answer: 'The materials were somewhat engaging; more interactive elements could help.',
    },
    {
      review_question_id: 3,
      review_id: 2,
      answer: 'I might recommend it, but with some caveats about the pacing.',
    },

    {
      review_question_id: 1,
      review_id: 3,
      answer: 'Yes, very applicable to my learning goals and career objectives.',
    },
    {
      review_question_id: 2,
      review_id: 3,
      answer: 'The lectures were engaging, but the reading materials were a bit dry.',
    },
    {
      review_question_id: 3,
      review_id: 3,
      answer: 'Yes, I would recommend this course for its practical insights.',
    },

    {
      review_question_id: 4,
      review_id: 4,
      answer: 'The instructor was very approachable and always available for support.',
    },
    {
      review_question_id: 5,
      review_id: 4,
      answer: 'Yes, the feedback was constructive and helped improve my work.',
    },
    {
      review_question_id: 6,
      review_id: 4,
      answer: 'The instructor could incorporate more real-life examples to enhance understanding.',
    },

    {
      review_question_id: 4,
      review_id: 5,
      answer: 'The instructor was somewhat approachable, but office hours were limited.',
    },
    {
      review_question_id: 5,
      review_id: 5,
      answer: 'Feedback was mostly positive but lacked detailed suggestions for improvement.',
    },
    {
      review_question_id: 6,
      review_id: 5,
      answer: 'They could engage more with students during lectures to foster discussion.',
    },

    {
      review_question_id: 4,
      review_id: 6,
      answer: 'The instructor was very approachable and encouraged questions from all students.',
    },
    {
      review_question_id: 5,
      review_id: 6,
      answer: 'The feedback was detailed and very helpful for my learning process.',
    },
    {
      review_question_id: 6,
      review_id: 6,
      answer: 'Incorporating more group activities could enhance learning experiences.',
    },
  ]);
};

export { seedReviewAnswers };
