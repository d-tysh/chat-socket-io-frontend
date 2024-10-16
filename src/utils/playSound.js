export const playSound = () => {
    const audio = new Audio('/notification-sound.mp3');
    audio.play();
}