import { TikTok } from "react-tiktok";
import { Flex, Text } from "@sanity/ui";

import { PreviewProps } from "sanity";

export function tiktokPreview(props: PreviewProps) {
  const { title: url } = props;

  return (
    <Flex padding={3} align="center" justify="center">
      {typeof url === "string" ? (
        <TikTok url={url} />
      ) : (
        <Text>Add a TikTok URL</Text>
      )}
    </Flex>
  );
}
