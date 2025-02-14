import { Tag } from "@/components/ui/tag";
import { dropTargetForExternal } from "@atlaskit/pragmatic-drag-and-drop/external/adapter";
import { getFiles } from "@atlaskit/pragmatic-drag-and-drop/external/file";
import { getText } from "@atlaskit/pragmatic-drag-and-drop/external/text";
import { BoxProps, Flex, Grid, GridProps, Input } from "@chakra-ui/react";
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";

export interface FileDropzoneProps {
  children?: ReactNode;
  onDrop?: ({ files, text }: { files: File[]; text?: string | null }) => void;
  gridProps?: GridProps;
  placeholder?: string;
}

export const FileDropzone = ({
  children = undefined,
  gridProps = {},
  onDrop = () => {},
  placeholder = "Drop files here or click to upload",
}: FileDropzoneProps) => {
  const ref = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForExternal({
      element: el,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      //   canDrop: some(containsFiles, containsText),
      onDrop: ({ source }) => {
        const files = getFiles({ source });
        const text = getText({ source });
        console.log(files, text, "dfposa");
        onDrop({ files, text });
      },
    });
  }, [onDrop]);

  // const isDark = (location + location) % 2 === 1;

  function getColor(isDraggedOver: boolean): BoxProps {
    if (isDraggedOver) {
      return {
        backgroundColor: "blue.400",
        _dark: {
          backgroundColor: "blue.400",
        },
      };
    }
    // return isDark ? "lightgrey" : "white";
    return {
      backgroundColor: undefined,
      _dark: {
        backgroundColor: undefined,
      },
    };
  }

  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInput.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // @ts-expect-error find appropriate types for event target files
    const filesArray = [...event.target.files];
    onDrop({ files: filesArray });
  };

  return (
    <Grid
      {...getColor(isDraggedOver)}
      ref={ref}
      cursor={"pointer"}
      onClick={handleClick}
      borderStyle={"dashed"}
      borderColor={"gray.400"}
      alignContent={"center"}
      justifyContent={"center"}
      borderWidth={1}
      borderRadius={4}
      {...gridProps}
    >
      {children}
      {!!children === false && (
        <>
          <Flex>{placeholder}</Flex>
          <Input
            type="file"
            multiple
            style={{ display: "none" }}
            ref={fileInput}
            onChange={handleChange}
          />
        </>
      )}
    </Grid>
  );
};
