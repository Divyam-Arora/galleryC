export const ApiBaseUrl = "https://gallery.up.railway.app/";
// export const ApiBaseUrl = "http://localhost:8080/";
export const ApiBasePublicUrl = ApiBaseUrl + "api/public/";
export const ApiBasePrivateUrl = ApiBaseUrl + "api/";
export const ApiUserIcon = ApiBasePublicUrl + "user-icon.png";
export const ApiRefreshToken = () => ApiBasePublicUrl + "refresh";
export const ApiLogin = () => ApiBasePublicUrl + "login";
export const ApiSignup = () => ApiBasePublicUrl + "register";
export const ApiGetAllMedia = (
  page = 0,
  extra = 0,
  year = null,
  month = null,
  date = null
) =>
  ApiBasePrivateUrl +
  `media?page=${page}&extra=${extra}${year ? `&year=${year}` : ""}${
    month ? `&month=${month}` : ""
  }${date ? `&date=${date}` : ""}`;
export const ApiGetMedia = (mediaId) => ApiBasePrivateUrl + "media/" + mediaId;
export const ApiDeleteMedia = (mediaId) =>
  ApiBasePrivateUrl + "media/" + mediaId;
export const ApiGetMediaAlbums = (mediaId) =>
  ApiBasePrivateUrl + "media/" + mediaId + "/albums";
export const ApiGetAllMediaAlbums = (mediaId) =>
  ApiBasePrivateUrl + "media/" + mediaId + "/albums/all";
export const ApiEditMediaAlbums = (mediaId) =>
  ApiBasePrivateUrl + "media/" + mediaId + "/albums";
export const ApiGetMediaConversations = (mediaId) =>
  ApiBasePrivateUrl + "media/" + mediaId + "/conversations";
export const ApiGetAllMediaConversations = (mediaId) =>
  ApiBasePrivateUrl + "media/" + mediaId + "/conversations/all";
export const ApiEditMediaConversations = (mediaId) =>
  ApiBasePrivateUrl + "media/" + mediaId + "/conversations";
export const ApiGetMediaTags = (mediaId) =>
  ApiBasePrivateUrl + "media/" + mediaId + "/tags";
export const ApiEditMediaTags = (mediaId) =>
  ApiBasePrivateUrl + "media/" + mediaId + "/tags";
export const ApiGetTags = (value) => ApiBasePrivateUrl + "tag?s=" + value;
export const ApiUploadMedia = () => ApiBasePrivateUrl + "media/upload";
export const ApiExploreMedia = (search, type = "", target = "Name") =>
  ApiBasePrivateUrl + `explore?s=${search}&target=${target}&type=${type}`;
export const ApiGetUserDetails = () => ApiBasePrivateUrl + "user/me";
export const ApiEditUserIcon = () => ApiBasePrivateUrl + "user/me/icon";
export const ApiCreateAlbum = () => ApiBasePrivateUrl + "album";

export const ApiGetAllAlbums = (page = 0, extra = 0, search = "") =>
  ApiBasePrivateUrl + `album?page=${page}&extra=${extra}&search=${search}`;

export const ApiGetAlbum = (albumId) => ApiBasePrivateUrl + `album/${albumId}`;

export const ApiGetAlbumMedia = (albumId, page = 0, extra = 0, search = "") =>
  ApiBasePrivateUrl +
  `album/${albumId}/media?page=${page}&extra=${extra}&search=${search}`;

export const ApiGetAllAlbumMedia = (albumId) =>
  ApiBasePrivateUrl + `album/${albumId}/media/all`;

export const ApiEditAlbumMedia = function (albumId) {
  return ApiBasePrivateUrl + "album/" + albumId + "/media";
};

export const ApiDeleteAlbum = (albumId) =>
  ApiBasePrivateUrl + "album/" + albumId;

export const ApiEditAlbum = (albumId) => ApiBasePrivateUrl + "album/" + albumId;

export const ApiGetAllYear = () => ApiBasePrivateUrl + "media/year";

export const ApiGetAllMonth = (year = new Date().getFullYear()) =>
  ApiBasePrivateUrl + `media/year/${year}/month`;

export const ApiGetAllDate = (
  year = new Date().getFullYear(),
  month = "January"
) => ApiBasePrivateUrl + `media/year/${year}/month/${month}/date`;

export const ApiGetPeople = (search = "") =>
  ApiBasePrivateUrl + `user/get?search=${search}`;

export const ApiGetPerson = (username = "") =>
  ApiBasePrivateUrl + `user/${username}`;

export const ApiGetPersonSharedMedia = (
  username = "",
  page = "0",
  extra = "0",
  search = ""
) =>
  ApiBasePrivateUrl +
  `user/${username}/media?page=${page}&extra=${extra}&search=${search}`;

export const ApiGetPersonSharedGroups = (username = "", page = "0") =>
  ApiBasePrivateUrl + `user/${username}/groups?page=${page}`;

export const ApiGetPersonSharedMediaConversations = (
  username = "",
  mediaId = 0,
  page = "0"
) => ApiBasePrivateUrl + `user/${username}/media/${mediaId}/conversations`;

export const ApiGetAllPersonSharedMedia = (username = "") =>
  ApiBasePrivateUrl + `share/person/${username}/media/all`;

export const ApiEditPeopleSharedMedia = () =>
  ApiBasePrivateUrl + "share/edit/people/media";

export const ApiGetAllConversations = (
  page = 0,
  extra = 0,
  search = "",
  recent = 0,
  active = false
) =>
  ApiBasePrivateUrl +
  `conversation?page=${page}&extra=${extra}&search=${search}&recent=${recent}&active=${active}`;

export const ApiGetConversationDetails = (conversationId = 0) =>
  ApiBasePrivateUrl + `conversation/${conversationId}`;

export const ApiGetConversationMedia = (
  conversationId = 0,
  page = 0,
  search = ""
) =>
  ApiBasePrivateUrl +
  `conversation/${conversationId}/media?page=${page}&search=${search}`;

export const ApiGetConversationActivity = (
  conversationId = 0,
  page = 0,
  extra = 0,
  search = "",
  recent = 0
) =>
  ApiBasePrivateUrl +
  `conversation/${conversationId}/activity?page=${page}&extra=${extra}&search=${search}&recent=${recent}`;

export const ApiGetAllConversationMedia = (conversationId = 0) =>
  ApiBasePrivateUrl + `conversation/${conversationId}/media/all`;

export const ApiEditConversationMedia = (conversationId = 0) =>
  ApiBasePrivateUrl + `conversation/${conversationId}/media`;

export const ApiGetConversationInfo = (conversationId = 0) =>
  ApiBasePrivateUrl + `conversation/${conversationId}/info`;

export const ApiGetConversationMembers = (
  conversationId = 0,
  page = 0,
  extra = 0,
  search = ""
) =>
  ApiBasePrivateUrl +
  `conversation/${conversationId}/members?page=${page}&extra=${extra}&search=${search}`;

export const ApiGetAllConversationMembers = (conversationId = 0) =>
  ApiBasePrivateUrl + `conversation/${conversationId}/members/all`;

export const ApiLeaveConversation = (conversationId = 0) =>
  ApiBasePrivateUrl + `conversation/${conversationId}/leave`;

export const ApiEditConversationMembers = (conversationId = "") =>
  ApiBasePrivateUrl + `conversation?id=${conversationId}`;

export const ApiEditGroupName = (conversationId = 0) =>
  ApiBasePrivateUrl + `conversation/${conversationId}/name`;

export const ApiEditGroupIcon = (conversationId = 0) =>
  ApiBasePrivateUrl + `conversation/${conversationId}/icon`;

export const ApiDeleteGroupIcon = (conversationId = 0) =>
  ApiBasePrivateUrl + `conversation/${conversationId}/icon`;

export const ApiGetRecentActivity = (
  recent = 0,
  conversationId = 0,
  recentActivity = 0,
  search = ""
) =>
  ApiBasePrivateUrl +
  `conversation/activity?sinceConversation=${recent}&conversationId=${conversationId}&sinceActivity=${recentActivity}&search=${search}`;
