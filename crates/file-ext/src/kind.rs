use serde::{Deserialize, Serialize};
use specta::Type;
use strum_macros::{Display, EnumIter};
// Note: The order of this enum should never change, and always be kept in sync with `packages/client/src/utils/objectKind.ts`
#[repr(i32)]
#[derive(Debug, Clone, Display, Copy, EnumIter, Type, Serialize, Deserialize, Eq, PartialEq)]
pub enum ObjectKind {
	/// A file that can not be identified by the indexer
	Unknown = 0,
	/// A known filetype, but without specific support
	Document = 1,
	/// A virtual filesystem directory
	Folder = 2,
	/// A file that contains human-readable text
	Text = 3,
	/// A virtual directory int
	Package = 4,
	/// An image file
	Image = 5,
	/// An audio file
	Audio = 6,
	/// A video file
	Video = 7,
	/// A compressed archive of data
	Archive = 8,
	/// An executable, program or application
	Executable = 9,
	/// A link to another object
	Alias = 10,
	/// Raw bytes encrypted by Spacedrive with self contained metadata
	Encrypted = 11,
	/// A key or certificate file
	Key = 12,
	/// A link can open web pages, apps or Spaces
	Link = 13,
	/// A special filetype that represents a preserved webpage
	WebPageArchive = 14,
	/// A widget is a mini app that can be placed in a Space at various sizes, associated Widget struct required
	Widget = 15,
	/// Albums can only have one level of children, and are associated with the Album struct
	Album = 16,
	/// Its like a folder, but appears like a stack of files, designed for burst photos / associated groups of files
	Collection = 17,
	/// You know, text init
	Font = 18,
	/// 3D Object
	Mesh = 19,
	/// Editable source code file
	Code = 20,
	/// Database file
	Database = 21,
	/// E-book file
	Book = 22,
	/// Config file
	Config = 23,
	/// Dotfile
	Dotfile = 24,
	/// Screenshot
	Screenshot = 25,
	/// Label
	Label = 26,
}

impl ObjectKind {
	pub fn from_i32(value: i32) -> Self {
		match value {
			0 => ObjectKind::Unknown,
			1 => ObjectKind::Document,
			2 => ObjectKind::Folder,
			3 => ObjectKind::Text,
			4 => ObjectKind::Package,
			5 => ObjectKind::Image,
			6 => ObjectKind::Audio,
			7 => ObjectKind::Video,
			8 => ObjectKind::Archive,
			9 => ObjectKind::Executable,
			10 => ObjectKind::Alias,
			11 => ObjectKind::Encrypted,
			12 => ObjectKind::Key,
			13 => ObjectKind::Link,
			14 => ObjectKind::WebPageArchive,
			15 => ObjectKind::Widget,
			16 => ObjectKind::Album,
			17 => ObjectKind::Collection,
			18 => ObjectKind::Font,
			19 => ObjectKind::Mesh,
			20 => ObjectKind::Code,
			21 => ObjectKind::Database,
			22 => ObjectKind::Book,
			23 => ObjectKind::Config,
			24 => ObjectKind::Dotfile,
			25 => ObjectKind::Screenshot,
			26 => ObjectKind::Label,
			_ => ObjectKind::Unknown,
		}
	}
}
