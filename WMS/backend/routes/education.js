const express = require('express');
const router = express.Router();

// Educational content
const educationalContent = {
  recyclingTips: [
    {
      id: 1,
      title: "Plastic Recycling",
      content: "Always clean plastic containers before recycling. Remove caps and labels when possible.",
      category: "plastic"
    },
    {
      id: 2,
      title: "Paper Recycling",
      content: "Keep paper dry and clean. Remove any plastic wrappings before recycling.",
      category: "paper"
    },
    {
      id: 3,
      title: "Glass Recycling",
      content: "Glass should be clean and separated by color. Don't mix broken glass with intact containers.",
      category: "glass"
    }
  ],
  wasteFacts: [
    {
      id: 1,
      fact: "Recycling one aluminum can saves enough energy to run a TV for three hours.",
      source: "EPA"
    },
    {
      id: 2,
      fact: "Plastic bottles take 450 years to decompose in landfills.",
      source: "National Geographic"
    },
    {
      id: 3,
      fact: "Composting food waste reduces methane emissions from landfills.",
      source: "UN Environment Programme"
    }
  ]
};

// Get all educational content
router.get('/', (req, res) => {
  res.json(educationalContent);
});

// Get recycling tips by category
router.get('/tips/:category', (req, res) => {
  const category = req.params.category;
  const tips = educationalContent.recyclingTips.filter(tip => 
    tip.category === category
  );
  res.json(tips);
});

module.exports = router;