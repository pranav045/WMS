import React, { useState, useEffect } from 'react';

const RecyclingTips = () => {
  const [activeSection, setActiveSection] = useState('basics');
  const [quizScore, setQuizScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [recycledItems, setRecycledItems] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  // Enhanced sorting game state
  const [gameState, setGameState] = useState({
    currentItemIndex: 0,
    selectedBin: null,
    showFeedback: false,
    score: 0,
    gameCompleted: false
  });
  // Visual recycling steps - refined with professional icons (using text-based for simplicity, suggest react-icons in production)
  const recyclingSteps = [
    { icon: "📍", color: "#10B981", label: "Identify", description: "Locate recyclable materials in your environment. Look for symbols like the chasing arrows or specific resin codes on packaging." },
    { icon: "🧼", color: "#059669", label: "Prepare", description: "Clean items to ensure quality processing. Rinse food residues and remove non-recyclable attachments like plastic rings from cans." },
    { icon: "🔄", color: "#10B981", label: "Categorize", description: "Sort into appropriate collection streams. Understand local guidelines as rules vary by municipality." },
    { icon: "🚚", color: "#F59E0B", label: "Collection", description: "Scheduled pickup by waste management services. Place sorted items in designated bins on collection day." },
    { icon: "⚙️", color: "#8B5CF6", label: "Processing", description: "Industrial sorting and material refinement. Facilities use magnets, optical sorters, and balers to prepare materials." },
    { icon: "🔄", color: "#EC4899", label: "Reintegration", description: "Transformed into new consumer products. Recycled PET becomes fleece jackets; aluminum cans turn into vehicle parts." }
  ];
  // Refined material categories with professional tone - expanded with more details
  const materialCategories = [
    {
      id: 'plastic',
      name: 'Plastics',
      icon: '🥤',
      color: '#ef4444',
      examples: ['PET bottles (e.g., soda, water)', 'HDPE containers (e.g., milk jugs, shampoo)', 'PP packaging (e.g., yogurt tubs)', 'LDPE films (special handling)'],
      dos: ['Rinse thoroughly to remove residues', 'Remove caps and lids separately', 'Flatten bottles and containers to save space', 'Check for #1-7 resin codes'],
      donts: ['Food-contaminated items that attract pests', 'Film plastics in curbside bins (use drop-offs)', 'Contaminated or multi-layered packaging', 'Styrofoam or polystyrene (limited programs)']
    },
    {
      id: 'paper',
      name: 'Paper & Cardboard',
      icon: '📄',
      color: '#3b82f6',
      examples: ['Office paper and envelopes', 'Corrugated boxes and cardboard', 'Newspapers and magazines', 'Junk mail (remove plastic windows)'],
      dos: ['Keep dry to maintain fiber quality', 'Flatten boxes and remove packing tape', 'Bundle newspapers for easier handling', 'Shred sensitive documents before recycling'],
      donts: ['Soiled paper with food oils or grease', 'Thermal receipts (BPA-coated)', 'Waxed or coated cardboard', 'Paper towels or tissues (compost organics)']
    },
    {
      id: 'glass',
      name: 'Glass',
      icon: '🍶',
      color: '#10b981',
      examples: ['Beverage bottles (beer, wine, soda)', 'Food jars (jams, sauces)', 'Clear or colored containers', 'Medicine bottles (remove labels)'],
      dos: ['Separate by color (clear, green, brown) where required', 'Remove metal lids and recycle separately', 'Rinse clean to prevent contamination', 'Use gloves for broken glass'],
      donts: ['Pyrex or heat-resistant glass (thermal stress issues)', 'Mirrors, windows, or auto glass (different composition)', 'Light bulbs or ceramics (not meltable)', 'Drinking glasses (non-container grade)']
    },
    {
      id: 'metal',
      name: 'Metals',
      icon: '🥫',
      color: '#f59e0b',
      examples: ['Aluminum cans and foil', 'Steel tins and aerosol cans (empty)', 'Ferrous scrap like appliances', 'Non-ferrous like copper wire'],
      dos: ['Rinse interiors to avoid odors', 'Flatten cans to reduce volume', 'Remove labels and plastic attachments', 'Tape sharp edges for safety'],
      donts: ['Hazardous containers (paint, chemicals)', 'Scrap metal with attachments (e.g., wired tools)', 'Batteries or electronics (special e-waste)', 'Medical sharps or needles']
    }
  ];
  // Refined sorting game items with professional feedback - added two more items for depth
  const sortingGameItems = [
    {
      id: 1,
      name: "PET Water Bottle",
      icon: "🥤",
      correctBin: "recycling",
      description: "Type 1 Plastic - Accepted",
      explanation: "Correct. PET plastics are highly recyclable and processed into new containers, saving 70% energy vs. virgin production.",
      wrongExplanation: "Incorrect. PET bottles belong in recycling to reduce landfill waste and conserve petroleum resources."
    },
    {
      id: 2,
      name: "Greasy Pizza Box",
      icon: "📦",
      correctBin: "trash",
      description: "Contaminated Cardboard - Not Accepted",
      explanation: "Correct. Contamination prevents processing; dispose in general waste or compost clean portions separately.",
      wrongExplanation: "Incorrect. Greasy boxes contaminate batches; use general waste for soiled items to maintain stream purity."
    },
    {
      id: 3,
      name: "Aluminum Can",
      icon: "🥫",
      correctBin: "recycling",
      description: "Ferrous/Non-Ferrous Metal - Accepted",
      explanation: "Correct. Metals like aluminum are infinitely recyclable with minimal energy loss, reducing mining impacts.",
      wrongExplanation: "Incorrect. Recycling metals saves up to 95% of production energy compared to virgin materials."
    },
    {
      id: 4,
      name: "LDPE Plastic Bag",
      icon: "🛍️",
      correctBin: "special",
      description: "Film Plastic - Special Collection",
      explanation: "Correct. Film plastics require dedicated drop-off to avoid equipment damage in sorting facilities.",
      wrongExplanation: "Incorrect. Use designated collection points for film to ensure proper handling and prevent shutdowns."
    },
    {
      id: 5,
      name: "Glass Food Jar",
      icon: "🍶",
      correctBin: "recycling",
      description: "Container Glass - Accepted",
      explanation: "Correct. Glass is endlessly recyclable without quality degradation, lowering furnace temperatures by 30%.",
      wrongExplanation: "Incorrect. Clean glass containers support efficient cullet production for new bottles."
    },
    {
      id: 6,
      name: "Expanded Polystyrene",
      icon: "📦",
      correctBin: "trash",
      description: "EPS Foam - Limited Acceptance",
      explanation: "Correct. EPS is not curbside recyclable in most programs; check local options or use mail-back services.",
      wrongExplanation: "Incorrect. EPS foam typically enters general waste unless specialized programs exist for densification."
    },
    {
      id: 7,
      name: "Mixed Office Paper",
      icon: "📄",
      correctBin: "recycling",
      description: "Clean Paper - Accepted",
      explanation: "Correct. High-quality paper recycling preserves fiber length for premium new products like books.",
      wrongExplanation: "Incorrect. Dry office paper maximizes yield in pulping processes."
    },
    {
      id: 8,
      name: "Used Motor Oil",
      icon: "🛢️",
      correctBin: "special",
      description: "Hazardous Fluid - Special Handling",
      explanation: "Correct. Collect at auto centers; one gallon recycled prevents 42 gallons of groundwater contamination.",
      wrongExplanation: "Incorrect. Never pour down drains; use certified collection to reclaim as lubricant."
    }
  ];
  // Professional bin configurations - expanded descriptions
  const bins = [
    {
      id: "recycling",
      name: "Recyclables",
      icon: "♻️",
      color: "#10B981",
      description: "Clean containers, paper, metals. Follow local single-stream or multi-stream rules."
    },
    {
      id: "trash",
      name: "General Waste",
      icon: "🗑️",
      color: "#6B7280",
      description: "Non-recoverable materials. Landfill-bound items like soiled composites."
    },
    {
      id: "special",
      name: "Special Handling",
      icon: "⚠️",
      color: "#F59E0B",
      description: "Dedicated collection required. E-waste, oils, films, or textiles."
    }
  ];
  // Quiz expanded with more questions
  const quizQuestions = [
    {
      question: "Is pre-rinsing containers required for recycling?",
      options: ["Yes, to prevent contamination", "No, optional", "Only for specific materials"],
      correct: 0,
      explanation: "Pre-rinsing prevents cross-contamination in processing facilities, improving material quality and reducing rejection rates."
    },
    {
      question: "What is the proper disposal for plastic film bags?",
      options: ["Curbside recycling", "Grocery store collection", "General waste"],
      correct: 1,
      explanation: "Plastic films must go to dedicated bins at stores to avoid machinery entanglement and ensure high-volume processing."
    },
    {
      question: "Are all pizza boxes recyclable?",
      options: ["Yes, all types", "No, none", "Only clean, grease-free ones"],
      correct: 2,
      explanation: "Only uncontaminated boxes are suitable; grease renders them non-recyclable, but clean tops can sometimes be separated."
    },
    {
      question: "Can you recycle shredded paper?",
      options: ["Yes, in paper bins", "No, it clogs machines", "Only if bagged"],
      correct: 0,
      explanation: "Shredded paper is recyclable but may need loose placement; check local guidelines to avoid processing issues."
    },
    {
      question: "What should you do with old batteries?",
      options: ["Throw in trash", "Recycle with metals", "Special drop-off"],
      correct: 2,
      explanation: "Batteries contain hazardous materials; use designated e-waste or retailer programs to prevent fires and leaching."
    }
  ];
  // Transformation examples refined - expanded
  const transformationExamples = [
    { from: "🥤", to: "👔", description: "PET bottles → Textile fibers for clothing and carpets, reducing oil dependency." },
    { from: "🥫", to: "🚲", description: "Aluminum → Alloy components for bikes and aircraft, with 95% energy savings." },
    { from: "📄", to: "📦", description: "Cardboard → Packaging substrates or tissue paper, preserving forest resources." },
    { from: "🍶", to: "🏗️", description: "Glass cullet → Construction aggregates or new bottles, infinitely reusable." },
    { from: "📱", to: "🔌", description: "E-waste → Extracted metals for new electronics, recovering rare earth elements." },
    { from: "🍌", to: "🌱", description: "Organic scraps → Compost for soil enrichment, closing the nutrient loop." }
  ];
  // Game functions remain the same
  const handleBinSelect = (binId) => {
    if (gameState.showFeedback) return;
   
    const currentItem = sortingGameItems[gameState.currentItemIndex];
    const isCorrect = binId === currentItem.correctBin;
   
    setGameState(prev => ({
      ...prev,
      selectedBin: binId,
      showFeedback: true,
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  };
  const nextGameItem = () => {
    if (gameState.currentItemIndex < sortingGameItems.length - 1) {
      setGameState(prev => ({
        ...prev,
        currentItemIndex: prev.currentItemIndex + 1,
        selectedBin: null,
        showFeedback: false
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        gameCompleted: true
      }));
    }
  };
  const resetGame = () => {
    setGameState({
      currentItemIndex: 0,
      selectedBin: null,
      showFeedback: false,
      score: 0,
      gameCompleted: false
    });
  };
  // Challenge functions
  const startRecyclingChallenge = () => {
    setRecycledItems(0);
    setShowConfetti(false);
  };
  const addRecycledItem = () => {
    const newCount = recycledItems + 1;
    setRecycledItems(newCount);
   
    if (newCount % 5 === 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };
  // Quiz state and functions - expanded
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
   
    if (index === quizQuestions[currentQuestion].correct) {
      setQuizScore(quizScore + 1);
    }
  };
  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowQuiz(false);
      alert(`Quiz Complete! Score: ${quizScore}/${quizQuestions.length}`);
      setQuizScore(0);
      setCurrentQuestion(0);
    }
  };
  const startQuiz = () => {
    setShowQuiz(true);
    setQuizScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };
  const currentGameItem = sortingGameItems[gameState.currentItemIndex];
  const progress = ((gameState.currentItemIndex + 1) / sortingGameItems.length) * 100;
  return (
    <>
      <style>{`
        :root {
          --primary-color: #10B981;
          --primary-dark: #10B981;
          --secondary-color: #3b82f6;
          --accent-color: #ef4444;
          --text-dark: #1e293b;
          --text-light: #6b7280;
          --light-color: #f8fafc;
          --border-color: #e5e7eb;
          --border-radius: 8px;
          --border-radius-lg: 12px;
          --shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          --shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .creative-recycling {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          position: relative;
          overflow-x: hidden;
          color: var(--text-dark);
        }
        /* Subtle Confetti (toned down for professionalism) */
        .confetti {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
        }
        .confetti-piece {
          position: absolute;
          width: 8px;
          height: 16px;
          background: var(--primary-color);
          top: 0;
          opacity: 0;
        }
        @keyframes confettiFall {
          0% { top: -100px; opacity: 0.8; transform: rotate(0deg); }
          100% { top: 100vh; opacity: 0; transform: rotate(180deg); }
        }
        /* Professional Sorting Game Styles - Increased sizes */
        .sorting-game-container {
          background: white;
          margin: 2.5rem 2rem;
          padding: 3rem;
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
        }
        .game-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .game-title {
          font-size: 2.5rem;
          color: var(--primary-color);
          margin-bottom: 1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        .game-progress {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          background: var(--light-color);
          padding: 1.25rem 2rem;
          border-radius: var(--border-radius);
          border: 1px solid var(--border-color);
        }
        .progress-bar {
          flex: 1;
          height: 10px;
          background: var(--border-color);
          border-radius: 5px;
          overflow: hidden;
          margin: 0 1.25rem;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary-color), var(--primary-dark));
          border-radius: 5px;
          transition: width 0.4s ease;
        }
        .progress-text {
          font-weight: 500;
          color: var(--text-dark);
          white-space: nowrap;
          font-size: 1.1rem;
        }
        .score-display {
          background: var(--primary-color);
          color: white;
          padding: 0.75rem 1.25rem;
          border-radius: var(--border-radius);
          font-weight: 600;
          font-size: 1.1rem;
        }
        /* Current Item Display */
        .current-item {
          text-align: center;
          margin-bottom: 3.5rem;
          padding: 2.5rem;
          background: var(--light-color);
          border-radius: var(--border-radius);
          border: 1px solid var(--border-color);
          color: var(--text-dark);
        }
        .item-icon {
          font-size: 4rem;
          margin-bottom: 1.25rem;
          display: block;
        }
        .item-name {
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--text-dark);
          margin-bottom: 0.75rem;
        }
        .item-description {
          color: var(--text-light);
          font-size: 1.1rem;
        }
        /* Bin Selection */
        .bins-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 2.5rem;
        }
        .bin-option {
          padding: 2.25rem 1.25rem;
          border-radius: var(--border-radius);
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 2px solid var(--border-color);
          position: relative;
          overflow: hidden;
          color: var(--text-dark);
          background: white;
        }
        .bin-option::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.4s;
        }
        .bin-option:hover::before {
          left: 100%;
        }
        .bin-option:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow);
        }
        .bin-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: block;
        }
        .bin-name {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--text-dark);
        }
        .bin-description {
          font-size: 1rem;
          color: var(--text-light);
        }
        /* Game Feedback */
        .game-feedback {
          text-align: center;
          padding: 2.25rem;
          border-radius: var(--border-radius);
          margin: 2.5rem 0;
          animation: slideIn 0.4s ease;
          color: var(--text-dark);
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .feedback-correct {
          background: rgba(16, 185, 129, 0.1);
          border: 2px solid var(--primary-color);
          color: var(--primary-dark);
        }
        .feedback-wrong {
          background: rgba(239, 68, 68, 0.1);
          border: 2px solid var(--accent-color);
          color: var(--accent-color);
        }
        .feedback-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .feedback-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text-dark);
        }
        .feedback-explanation {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-light);
        }
        /* Game Actions */
        .game-actions {
          display: flex;
          justify-content: center;
          gap: 1.25rem;
          margin-top: 2.5rem;
        }
        .game-button {
          padding: 1rem 2.25rem;
          border: none;
          border-radius: var(--border-radius);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.1rem;
          color: white;
        }
        .button-next {
          background: var(--primary-color);
        }
        .button-reset {
          background: var(--text-light);
        }
        /* Game Completed */
        .game-completed {
          text-align: center;
          padding: 3.5rem 2.5rem;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
          color: white;
          border-radius: var(--border-radius-lg);
        }
        .completed-icon {
          font-size: 3.5rem;
          margin-bottom: 1.25rem;
        }
        .completed-title {
          font-size: 2.25rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
          color: white;
        }
        .completed-score {
          font-size: 3rem;
          font-weight: 700;
          margin: 1.25rem 0;
          color: #FBBF24;
        }
        /* Bin States - Ensure text remains dark */
        .bin-selected-correct {
          border-color: var(--primary-color) !important;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2) !important;
          background: rgba(16, 185, 129, 0.1) !important;
          color: var(--text-dark) !important;
        }
        .bin-selected-wrong {
          border-color: var(--accent-color) !important;
          box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2) !important;
          background: rgba(239, 68, 68, 0.1) !important;
          color: var(--text-dark) !important;
        }
        .bin-correct-answer {
          border-color: var(--primary-color) !important;
          background: rgba(16, 185, 129, 0.1) !important;
          color: var(--text-dark) !important;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.3); }
          70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        /* Professional Header - Simplified */
        .recycling-header {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
          color: white;
          padding: 3.5rem 2.5rem;
          text-align: center;
          border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg);
          box-shadow: var(--shadow);
        }
        .header-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          letter-spacing: -0.025em;
          color: white;
        }
        .header-subtitle {
          font-size: 1.25rem;
          opacity: 0.95;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          color: white;
        }
        /* Navigation */
        .visual-nav {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin: 3rem 0;
          flex-wrap: wrap;
        }
        .nav-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.25rem 1.75rem;
          background: white;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius);
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: var(--shadow);
          min-width: 140px;
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-dark);
        }
        .nav-button.active {
          background: var(--primary-color);
          color: white;
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary-color);
        }
        .nav-icon {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }
        .nav-label {
          font-size: 1rem;
        }
        /* Sections - Increased padding and sizes */
        .process-section {
          background: white;
          margin: 2.5rem 2rem;
          padding: 3rem;
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
          color: var(--text-dark);
        }
        .section-title {
          font-size: 2rem;
          color: var(--primary-color);
          margin-bottom: 2.5rem;
          text-align: center;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        .process-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin: 2.5rem 0;
        }
        .process-step {
          text-align: center;
          padding: 2.25rem 1.25rem;
          border-radius: var(--border-radius);
          background: var(--light-color);
          transition: all 0.2s ease;
          border: 1px solid var(--border-color);
          color: var(--text-dark);
        }
        .process-step:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow);
        }
        .step-icon {
          font-size: 3rem;
          margin-bottom: 1.25rem;
          display: block;
        }
        .step-label {
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--text-dark);
          font-size: 1.1rem;
        }
        .material-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
          margin: 2.5rem 0;
        }
        .material-card {
          background: white;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
          transition: box-shadow 0.2s ease;
          color: var(--text-dark);
        }
        .material-card:hover {
          box-shadow: var(--shadow-lg);
        }
        .material-header {
          padding: 2.25rem;
          text-align: center;
          color: white;
        }
        .material-icon {
          font-size: 3rem;
          margin-bottom: 0.75rem;
        }
        .material-name {
          font-size: 1.5rem;
          font-weight: 600;
          color: white;
        }
        .material-content {
          padding: 2.25rem;
          color: var(--text-dark);
        }
        .material-examples {
          background: var(--light-color);
          padding: 1.25rem;
          border-radius: var(--border-radius);
          margin-bottom: 1.75rem;
          font-size: 1.1rem;
          border: 1px solid var(--border-color);
          color: var(--text-light);
        }
        .dos-donts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        .dos {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid var(--primary-color);
          padding: 1.25rem;
          border-radius: var(--border-radius);
          color: var(--text-dark);
        }
        .donts {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid var(--accent-color);
          padding: 1.25rem;
          border-radius: var(--border-radius);
          color: var(--text-dark);
        }
        .list-title {
          font-weight: 600;
          margin-bottom: 0.75rem;
          font-size: 1.1rem;
          color: var(--text-dark);
        }
        .transformation-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin: 2.5rem 0;
        }
        .transformation-item {
          text-align: center;
          padding: 2.25rem;
          background: white;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
          transition: transform 0.2s ease;
          color: var(--text-dark);
        }
        .transformation-item:hover {
          transform: translateY(-2px);
        }
        .transformation-path {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          margin: 1.25rem 0;
          font-size: 1.5rem;
        }
        .challenge-section {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
          color: white;
          padding: 3.5rem 2.5rem;
          border-radius: var(--border-radius-lg);
          text-align: center;
          margin: 2.5rem 2rem;
        }
        .challenge-counter {
          font-size: 3rem;
          font-weight: 700;
          margin: 1.25rem 0;
          letter-spacing: -0.025em;
          color: white;
        }
        .challenge-button {
          background: white;
          color: var(--primary-color);
          border: none;
          padding: 1rem 2.25rem;
          border-radius: var(--border-radius);
          font-weight: 600;
          cursor: pointer;
          margin: 0.75rem;
          transition: background 0.2s ease;
          color: var(--primary-color);
          font-size: 1.1rem;
        }
        .challenge-button:hover {
          background: var(--light-color);
        }
        /* Quiz Styles - Increased sizes */
        .quiz-container {
          background: white;
          margin: 2.5rem 2rem;
          padding: 3rem;
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        .quiz-question {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 2rem;
          color: var(--text-dark);
        }
        .quiz-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .quiz-option {
          padding: 1.25rem;
          border: 2px solid var(--border-color);
          border-radius: var(--border-radius);
          cursor: pointer;
          transition: all 0.2s ease;
          background: white;
          color: var(--text-dark);
          font-size: 1.1rem;
        }
        .quiz-option:hover {
          border-color: var(--primary-color);
          background: var(--light-color);
        }
        .quiz-option.selected {
          background: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }
        .quiz-explanation {
          background: var(--light-color);
          padding: 1.25rem;
          border-radius: var(--border-radius);
          margin-top: 1.25rem;
          color: var(--text-light);
          font-style: italic;
          font-size: 1.1rem;
        }
        .quiz-progress {
          text-align: center;
          margin-bottom: 2rem;
          color: var(--text-light);
          font-size: 1.1rem;
        }
        .quiz-button {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: var(--border-radius);
          font-weight: 600;
          cursor: pointer;
          margin: 0.75rem;
          font-size: 1.1rem;
        }
        .recycling-footer {
          text-align: center;
          padding: 3rem;
          background: #1f2937;
          color: white;
          margin-top: 3.5rem;
          font-size: 1.1rem;
        }
        @media (max-width: 768px) {
          .bins-container {
            grid-template-columns: 1fr;
          }
         
          .game-progress {
            flex-direction: column;
            gap: 1.25rem;
          }
         
          .progress-bar {
            margin: 0;
            width: 100%;
          }
          .dos-donts {
            grid-template-columns: 1fr;
          }
          .visual-nav {
            gap: 0.5rem;
          }
          .nav-button {
            min-width: 120px;
            padding: 1rem 1.25rem;
          }
        }
      `}</style>
      <div className="creative-recycling">
        {/* Subtle Confetti */}
        {showConfetti && (
          <div className="confetti">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  left: `${Math.random() * 100}%`,
                  background: `hsl(${Math.random() * 60 + 120}, 70%, 50%)`, // Greenish tones
                  animation: `confettiFall ${Math.random() * 2 + 1.5}s linear forwards`,
                  animationDelay: `${Math.random() * 1}s`
                }}
              />
            ))}
          </div>
        )}
        {/* Header - Simplified */}
        <header className="recycling-header">
          <h1 className="header-title">
            <span>♻️</span>
            Recycling Guide
          </h1>
          <p className="header-subtitle">
            Simple tips and tools to recycle better.
          </p>
        </header>
        {/* Navigation - Removed myths, compost, hazardous */}
        <div className="visual-nav">
          <button
            className={`nav-button ${activeSection === 'basics' ? 'active' : ''}`}
            onClick={() => setActiveSection('basics')}
          >
            <span className="nav-icon">🔄</span>
            <span className="nav-label">Process</span>
          </button>
          <button
            className={`nav-button ${activeSection === 'materials' ? 'active' : ''}`}
            onClick={() => setActiveSection('materials')}
          >
            <span className="nav-icon">📄</span>
            <span className="nav-label">Materials</span>
          </button>
          <button
            className={`nav-button ${activeSection === 'sorting' ? 'active' : ''}`}
            onClick={() => setActiveSection('sorting')}
          >
            <span className="nav-icon">🎯</span>
            <span className="nav-label">Simulator</span>
          </button>
          <button
            className={`nav-button ${activeSection === 'transform' ? 'active' : ''}`}
            onClick={() => setActiveSection('transform')}
          >
            <span className="nav-icon">🔄</span>
            <span className="nav-label">Lifecycle</span>
          </button>
          <button
            className={`nav-button ${activeSection === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveSection('quiz')}
          >
            <span className="nav-icon">📝</span>
            <span className="nav-label">Quiz</span>
          </button>
          <button
            className={`nav-button ${activeSection === 'challenge' ? 'active' : ''}`}
            onClick={() => setActiveSection('challenge')}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-label">Tracker</span>
          </button>
        </div>
        {/* Sorting Simulator */}
        {activeSection === 'sorting' && (
          <section className="sorting-game-container">
            <div className="game-header">
              <h2 className="game-title">
                <span>🎯</span>
                Waste Sorting Simulator
              </h2>
              <p>Assess your knowledge: Select the appropriate disposal stream for each material. Expanded with real-world scenarios.</p>
            </div>
            {!gameState.gameCompleted ? (
              <>
                {/* Progress */}
                <div className="game-progress">
                  <div className="progress-text">
                    Material {gameState.currentItemIndex + 1} of {sortingGameItems.length}
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="score-display">
                    {gameState.score}/{sortingGameItems.length}
                  </div>
                </div>
                {/* Current Item */}
                <div className="current-item">
                  <div className="item-icon">{currentGameItem.icon}</div>
                  <div className="item-name">{currentGameItem.name}</div>
                  <div className="item-description">{currentGameItem.description}</div>
                </div>
                {/* Bins */}
                <div className="bins-container">
                  {bins.map(bin => {
                    let binClass = "bin-option";
                   
                    if (gameState.selectedBin === bin.id) {
                      binClass += gameState.selectedBin === currentGameItem.correctBin
                        ? " bin-selected-correct"
                        : " bin-selected-wrong";
                    }
                   
                    if (gameState.showFeedback && bin.id === currentGameItem.correctBin) {
                      binClass += " bin-correct-answer";
                    }
                    return (
                      <div
                        key={bin.id}
                        className={binClass}
                        onClick={() => handleBinSelect(bin.id)}
                        style={{
                          borderColor: bin.color,
                          background: `linear-gradient(135deg, ${bin.color}10, ${bin.color}05)`
                        }}
                      >
                        <div className="bin-icon">{bin.icon}</div>
                        <div className="bin-name">{bin.name}</div>
                        <div className="bin-description">{bin.description}</div>
                      </div>
                    );
                  })}
                </div>
                {/* Feedback */}
                {gameState.showFeedback && (
                  <div className={`game-feedback ${
                    gameState.selectedBin === currentGameItem.correctBin ? 'feedback-correct' : 'feedback-wrong'
                  }`}>
                    <div className="feedback-icon">
                      {gameState.selectedBin === currentGameItem.correctBin ? '✓' : '✗'}
                    </div>
                    <div className="feedback-title">
                      {gameState.selectedBin === currentGameItem.correctBin ? 'Accurate' : 'Review Required'}
                    </div>
                    <div className="feedback-explanation">
                      {gameState.selectedBin === currentGameItem.correctBin
                        ? currentGameItem.explanation
                        : currentGameItem.wrongExplanation
                      }
                    </div>
                    <div className="game-actions">
                      <button className="game-button button-next" onClick={nextGameItem}>
                        {gameState.currentItemIndex < sortingGameItems.length - 1 ? 'Next Material' : 'View Summary'}
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Completed */
              <div className="game-completed">
                <div className="completed-icon">✓</div>
                <div className="completed-title">Simulation Complete</div>
                <div className="completed-score">
                  {gameState.score}/{sortingGameItems.length}
                </div>
                <p>
                  {gameState.score === sortingGameItems.length
                    ? "Exemplary performance. Your practices align with industry standards for waste diversion."
                    : "Solid foundation. Continued refinement will enhance efficacy and reduce contamination."
                  }
                </p>
                <div className="game-actions">
                  <button className="game-button button-reset" onClick={resetGame}>
                    Restart
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
        {/* Process */}
        {activeSection === 'basics' && (
          <section className="process-section">
            <h2 className="section-title">
              <span>🔄</span>
              The Recycling Lifecycle
            </h2>
            <div className="process-steps">
              {recyclingSteps.map((step, index) => (
                <div
                  key={index}
                  className="process-step"
                  style={{ borderTop: `3px solid ${step.color}` }}
                >
                  <span className="step-icon">{step.icon}</span>
                  <div className="step-label">{step.label}</div>
                  <div style={{fontSize: '1rem', color: 'var(--text-light)'}}>{step.description}</div>
                </div>
              ))}
            </div>
          </section>
        )}
        {/* Materials */}
        {activeSection === 'materials' && (
          <section className="process-section">
            <h2 className="section-title">
              <span>📄</span>
              Material Guidelines
            </h2>
            <div className="material-grid">
              {materialCategories.map(material => (
                <div key={material.id} className="material-card">
                  <div
                    className="material-header"
                    style={{ background: material.color }}
                  >
                    <div className="material-icon">{material.icon}</div>
                    <div className="material-name">{material.name}</div>
                  </div>
                  <div className="material-content">
                    <div className="material-examples">
                      <strong>Common Items:</strong> {material.examples.join(', ')}
                    </div>
                    <div className="dos-donts">
                      <div className="dos">
                        <div className="list-title">Recommended Practices</div>
                        {material.dos.map((item, index) => (
                          <div key={index} style={{marginBottom: '0.5rem', fontSize: '1rem'}}>• {item}</div>
                        ))}
                      </div>
                      <div className="donts">
                        <div className="list-title">Avoid</div>
                        {material.donts.map((item, index) => (
                          <div key={index} style={{marginBottom: '0.5rem', fontSize: '1rem'}}>• {item}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {/* Transformations */}
        {activeSection === 'transform' && (
          <section className="process-section">
            <h2 className="section-title">
              <span>🔄</span>
              Material Reprocessing Examples
            </h2>
            <div className="transformation-grid">
              {transformationExamples.map((example, index) => (
                <div key={index} className="transformation-item">
                  <div className="transformation-path">
                    <span>{example.from}</span>
                    <span style={{fontSize: '1.75rem', fontWeight: 'bold'}}>→</span>
                    <span>{example.to}</span>
                  </div>
                  <div style={{fontSize: '1rem', color: 'var(--text-light)'}}>{example.description}</div>
                </div>
              ))}
            </div>
          </section>
        )}
        {/* Quiz Section */}
        {activeSection === 'quiz' && (
          <section className="quiz-container">
            <h2 className="section-title" style={{justifyContent: 'center', marginBottom: '1.5rem'}}>
              <span>📝</span>
              Knowledge Assessment Quiz
            </h2>
            {!showQuiz ? (
              <div style={{textAlign: 'center'}}>
                <p style={{color: 'var(--text-light)', marginBottom: '2.5rem', fontSize: '1.1rem'}}>Test your understanding with 5 targeted questions on recycling best practices.</p>
                <button className="quiz-button" onClick={startQuiz}>Start Quiz</button>
              </div>
            ) : (
              <>
                <div className="quiz-progress">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </div>
                <div className="quiz-question">{quizQuestions[currentQuestion].question}</div>
                <div className="quiz-options">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      className={`quiz-option ${selectedAnswer === index ? 'selected' : ''}`}
                      onClick={() => !showExplanation && handleAnswerSelect(index)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                {showExplanation && (
                  <>
                    <div className="quiz-explanation">{quizQuestions[currentQuestion].explanation}</div>
                    <button className="quiz-button" onClick={nextQuestion}>
                      {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button>
                  </>
                )}
              </>
            )}
          </section>
        )}
        {/* Tracker */}
        {activeSection === 'challenge' && (
          <section className="challenge-section">
            <h2 style={{fontSize: '2rem', fontWeight: '600', marginBottom: '1.25rem', color: 'white'}}>Personal Impact Tracker</h2>
            <div className="challenge-counter">
              {recycledItems} Items
            </div>
            <p style={{fontSize: '1.1rem', opacity: 0.9, color: 'white'}}>Total diverted from waste streams. Log daily to track progress toward sustainability goals.</p>
            <div>
              <button className="challenge-button" onClick={addRecycledItem}>
                Log Item
              </button>
              <button className="challenge-button" onClick={startRecyclingChallenge}>
                Reset
              </button>
            </div>
          </section>
        )}
        {/* Footer */}
        <footer className="recycling-footer">
          <div style={{fontSize: '1.25rem', marginBottom: '0.75rem', color: 'white'}}>Recycle Right</div>
          <p style={{color: 'white'}}>Simple steps for a greener tomorrow.</p>
        </footer>
      </div>
    </>
  );
};

export default RecyclingTips;