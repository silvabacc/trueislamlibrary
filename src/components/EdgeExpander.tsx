import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button } from "@mantine/core";

export default function EdgeExpander() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        offset={8}
        radius="md"
        opened={opened}
        onClose={close}
        position="right"
        withinPortal={false}
        title="Authentication"
      >
        {/* Drawer content */}
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
