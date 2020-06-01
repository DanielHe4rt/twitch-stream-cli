const switchScene = sceneName => 
  obs.send("SetCurrentScene", {
    "scene-name": sceneName,
  })

export default switchScene;
