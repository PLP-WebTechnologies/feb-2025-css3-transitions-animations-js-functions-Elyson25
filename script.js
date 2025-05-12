document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const animationTarget = document.getElementById('animationTarget');
    const pulseBtn = document.getElementById('pulseBtn');
    const spinBtn = document.getElementById('spinBtn');
    const bounceBtn = document.getElementById('bounceBtn');
    const stopBtn = document.getElementById('stopBtn');
    const bgColorInput = document.getElementById('bgColor');
    const boxColorInput = document.getElementById('boxColor');
    const defaultAnimationSelect = document.getElementById('defaultAnimation');
    const savePrefsBtn = document.getElementById('savePrefs');
    
    // Load saved preferences
    loadPreferences();
    
    // Event Listeners
    pulseBtn.addEventListener('click', () => applyAnimation('pulse'));
    spinBtn.addEventListener('click', () => applyAnimation('spin'));
    bounceBtn.addEventListener('click', () => applyAnimation('bounce'));
    stopBtn.addEventListener('click', stopAnimation);
    
    animationTarget.addEventListener('click', function() {
        // Cycle through animations on click
        const currentAnim = animationTarget.classList.contains('pulse') ? 'pulse' : 
                            animationTarget.classList.contains('spin') ? 'spin' : 
                            animationTarget.classList.contains('bounce') ? 'bounce' : 'none';
        
        stopAnimation();
        
        switch(currentAnim) {
            case 'none': applyAnimation('pulse'); break;
            case 'pulse': applyAnimation('spin'); break;
            case 'spin': applyAnimation('bounce'); break;
            case 'bounce': applyAnimation('pulse'); break;
        }
    });
    
    savePrefsBtn.addEventListener('click', savePreferences);
    
    // Functions
    function applyAnimation(animationClass) {
        stopAnimation();
        animationTarget.classList.add(animationClass);
        
        // Store the current animation in localStorage
        localStorage.setItem('currentAnimation', animationClass);
    }
    
    function stopAnimation() {
        animationTarget.classList.remove('pulse', 'spin', 'bounce');
        localStorage.removeItem('currentAnimation');
    }
    
    function savePreferences() {
        const preferences = {
            bgColor: bgColorInput.value,
            boxColor: boxColorInput.value,
            defaultAnimation: defaultAnimationSelect.value
        };
        
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        
        // Apply the preferences immediately
        applyUserPreferences(preferences);
        
        // Show a confirmation
        alert('Preferences saved! They will be applied on your next visit.');
    }
    
    function loadPreferences() {
        const savedPrefs = localStorage.getItem('userPreferences');
        const currentAnimation = localStorage.getItem('currentAnimation');
        
        if (savedPrefs) {
            const preferences = JSON.parse(savedPrefs);
            
            // Set the form values
            bgColorInput.value = preferences.bgColor;
            boxColorInput.value = preferences.boxColor;
            defaultAnimationSelect.value = preferences.defaultAnimation;
            
            // Apply the preferences
            applyUserPreferences(preferences);
        }
        
        // Apply any active animation
        if (currentAnimation) {
            applyAnimation(currentAnimation);
        }
    }
    
    function applyUserPreferences(preferences) {
        // Apply background color
        document.body.style.backgroundColor = preferences.bgColor;
        
        // Apply box color
        animationTarget.style.backgroundColor = preferences.boxColor;
        
        // Apply default animation if set
        if (preferences.defaultAnimation !== 'none') {
            applyAnimation(preferences.defaultAnimation);
        } else {
            stopAnimation();
        }
    }
    
    // Color change event listeners for real-time preview
    bgColorInput.addEventListener('input', function() {
        document.body.style.backgroundColor = this.value;
    });
    
    boxColorInput.addEventListener('input', function() {
        animationTarget.style.backgroundColor = this.value;
    });
});