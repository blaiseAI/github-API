// Application scope
window.addEventListener("load", e => {
  const displayFollowers = document.querySelector("#followers");
  const displayAvatar = document.querySelector(".nav");
  const input = document.querySelector("#search");
  const Search = document.querySelector("#submit");

  var defaultLoad = document.createElement("p");
  defaultLoad.innerHTML = "Waiting..";
  displayFollowers.appendChild(defaultLoad);

  Search.addEventListener("click", e => {
    e.preventDefault();
    defaultLoad.innerHTML = "";
    const githubRequest = async loginName => {
      try {
        displayFollowers.innerHTML = "";
        var response = await fetch(
          `https://api.github.com/users/${loginName}/followers`
        );
        var parsedData = await response.json();
        console.log(parsedData.length);
        if (parsedData.length == 0) {
          console.log("User has 0 followers");
          displayFollowers.innerHTML = "User has 0 followers";
        }
        parsedData.forEach((element, index) => {
          var name = element.login;
          var avatar = element.avatar_url;
          var follower = document.createElement("li");
          follower.dataset.index = index;
          follower.addEventListener("click", onDisplayFollowerData);
          follower.innerHTML = name;
          displayFollowers.appendChild(follower);
        });
      } catch (e) {
        console.log(`Data did not load ${e}`);
        var follower = document.createElement("li");
        follower.innerHTML = `${parsedData.message}`;
        displayFollowers.appendChild(follower);
      }
    };
    githubRequest(input.value);
  }); //end of followers fetch

  /**
   * Request a github profile info for an individual follower
   */
  function onDisplayFollowerData(e) {
    const loginName = e.target.textContent;
    console.log(loginName);
    const githubProfileRequest = async loginName => {
      try {
        displayAvatar.innerHTML = "";
        var response = await fetch(`https://api.github.com/users/${loginName}`);
        var json = await response.json();
        console.log(json);
        var profile = document.createElement("img");
        profile.srcset = `${json.avatar_url}`;
        displayAvatar.appendChild(profile);
      } catch (error) {}
    };
    githubProfileRequest(loginName);
  }
}); //no code outside
