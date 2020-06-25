import { homedir } from "os";
import { envrel, homerel, isWin, isMac } from "./utils";

type Resolver = () => string | null;

interface UserDir {
  home: Resolver;
  audio: Resolver;
  desktop: Resolver;
  document: Resolver;
  download: Resolver;
  font: Resolver;
  picture: Resolver;
  public: Resolver;
  template: Resolver;
  video: Resolver;
}

const userDirsWin: UserDir = {
  home: () => envrel("FOLDERID_Profile"),
  audio: () => envrel("FOLDERID_Music"),
  desktop: () => envrel("FOLDERID_Desktop"),
  document: () => envrel("FOLDERID_Documents"),
  download: () => envrel("FOLDERID_Downloads"),
  font: () => null,
  picture: () => envrel("FOLDERID_Pictures"),
  public: () => envrel("FOLDERID_Public"),
  template: () => envrel("FOLDERID_Templates"),
  video: () => envrel("FOLDERID_Videos"),
};

const userDirsMac: UserDir = {
  home: () => homedir(),
  audio: () => homerel("Music"),
  desktop: () => homerel("Desktop"),
  document: () => homerel("Documents"),
  download: () => homerel("Downloads"),
  font: () => homerel("Library/Fonts"),
  picture: () => homerel("Pictures"),
  public: () => homerel("Public"),
  template: () => null,
  video: () => homerel("Movies"),
};

const userDirsLinux: UserDir = {
  home: () => homedir(),
  audio: () => envrel("XDG_MUSIC_DIR"),
  desktop: () => envrel("XDG_DESKTOP_DIR"),
  document: () => envrel("XDG_DOCUMENTS_DIR"),
  download: () => envrel("XDG_DOWNLOAD_DIR"),
  font: () => envrel("XDG_DATA_HOME", "fonts") || homerel(".local/share/fonts"),
  picture: () => envrel("XDG_PICTURES_DIR"),
  public: () => envrel("XDG_PUBLICSHARE_DIR"),
  template: () => envrel("XDG_TEMPLATES_DIR"),
  video: () => envrel("XDG_VIDEOS_DIR"),
};

export const userDirs = isWin()
  ? userDirsWin
  : isMac()
  ? userDirsMac
  : userDirsLinux;
