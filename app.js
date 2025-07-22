const breedSelect = document.getElementById("breedSelect");
const subBreedSelect = document.getElementById("subBreedSelect");
const loadBreedImageBtn = document.getElementById("loadBreedImageBtn");
const breedImage = document.getElementById("breedImage");
const dogImage = document.getElementById("dogImage");
const breedList = document.getElementById("breedList");
const randomDogBtn = document.getElementById("randomDogBtn");
const allBreedsBtn = document.getElementById("allBreedsBtn");

// ✅ 通用 fetch 封装
async function fetchData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch error:", err);
    alert("Error loading data!");
  }
}

// ✅ 随机狗狗
async function getRandomDog() {
  const data = await fetchData("https://dog.ceo/api/breeds/image/random");
  if (data?.message) {
    dogImage.src = data.message;
  }
}

// ✅ 所有品种列表
async function getAllBreeds() {
  const data = await fetchData("https://dog.ceo/api/breeds/list/all");
  breedList.innerHTML = "";
  for (const breed in data.message) {
    const li = document.createElement("li");
    li.textContent = breed;
    breedList.appendChild(li);
  }
}

// ✅ 初始化 breed 下拉菜单
async function populateBreedSelect() {
  const data = await fetchData("https://dog.ceo/api/breeds/list/all");
  const breeds = data.message;

  for (const breed in breeds) {
    const option = document.createElement("option");
    option.value = breed;
    option.textContent = breed;
    breedSelect.appendChild(option);
  }
}

// ✅ 检查子品种
breedSelect.addEventListener("change", async function () {
  const breed = this.value;
  if (!breed) {
    subBreedSelect.style.display = "none";
    return;
  }

  const data = await fetchData(`https://dog.ceo/api/breed/${breed}/list`);
  const subBreeds = data.message;

  subBreedSelect.innerHTML =
    '<option value="">-- Select a sub-breed --</option>';

  if (subBreeds.length > 0) {
    subBreeds.forEach((sb) => {
      const option = document.createElement("option");
      option.value = sb;
      option.textContent = sb;
      subBreedSelect.appendChild(option);
    });
    subBreedSelect.style.display = "inline-block";
  } else {
    subBreedSelect.style.display = "none";
  }
});

// ✅ 点击显示品种图片
loadBreedImageBtn.addEventListener("click", async () => {
  const breed = breedSelect.value;
  const subBreed = subBreedSelect.value;

  let url = "";

  if (breed && subBreed) {
    url = `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`;
  } else if (breed) {
    url = `https://dog.ceo/api/breed/${breed}/images/random`;
  } else {
    alert("Please select a breed!");
    return;
  }

  const data = await fetchData(url);
  if (data?.message) {
    breedImage.src = data.message;
  }
});

// ✅ 初始化
populateBreedSelect();

// ✅ 按钮事件
randomDogBtn.addEventListener("click", getRandomDog);
allBreedsBtn.addEventListener("click", getAllBreeds);
