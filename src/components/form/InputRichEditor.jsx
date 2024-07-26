import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const colors = [
  "#000000",
  "#e60000",
  "#ff9900",
  "#ffff00",
  "#008a00",
  "#0066cc",
  "#9933ff",
  "#ffffff",
  "#facccc",
  "#ffebcc",
  "#ffffcc",
  "#cce8cc",
  "#cce0f5",
  "#ebd6ff",
  "#bbbbbb",
  "#f06666",
  "#ffc266",
  "#ffff66",
  "#66b966",
  "#66a3e0",
  "#c285ff",
  "#888888",
  "#a10000",
  "#b26b00",
  "#b2b200",
  "#006100",
  "#0047b2",
  "#6b24b2",
  "#444444",
  "#5c0000",
  "#663d00",
  "#666600",
  "#003700",
  "#002966",
  "#3d1466",
];

const jabarayaColors = [
  "#56c596",
  "#e3f5ee",
  "#c7ecdc",
  "#abe2ca",
  "#8ed8b9",
  "#72cfa7",
  "#2d947f",
  "#329d9c",
  "#32898b",
  "#32798b",
  "#205072",
  "#aab9c5",
  "#eaedf1",
  "#d4dce2",
  "#bfcbd4",
  "#93a6b6",
  "#7d94a6",
  "#678196",
  "#576e80",
  "#485a69",
  "#394753",
  "#29343c",
  "#fafafa",
  "#e3e3e3",
  "#cccbcb",
  "#b5b3b3",
  "#9f9c9c",
  "#898483",
  "#726c6c",
  "#5a5555",
  "#433f3e",
  "#2b2928",
  "#151413",
  "#0a0b0a",
  "#A4F4E7",
  "#15B097",
  "#0B7B69",
  "#F4C790",
  "#EDA145",
  "#CC7914",
  "#E4626F",
  "#C03744",
  "#8C1823",
];

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, false] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }], // custom font sizes
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: jabarayaColors }, { background: jabarayaColors }], // dropdown with defaults from theme
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }], // list icons
    [{ direction: "rtl" }], // text direction
    [{ align: [] }], // text align
    ["link", "image", "video"],
    ["clean"], // remove formatting button
  ],
};

const formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "color", "background", "script", "list", "bullet", "indent", "direction", "align", "link", "image", "video"];

const InputRichEditor = ({ value, onChange }) => {
  return <ReactQuill value={value} onChange={onChange} modules={modules} formats={formats} theme="snow" placeholder="e.g Content..." />;
};

export default InputRichEditor;
