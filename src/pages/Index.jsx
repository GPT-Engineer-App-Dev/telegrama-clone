import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Send, Settings, User } from "lucide-react";

const contacts = [
  { id: 1, name: "John Doe", avatar: "/placeholder.svg", status: "online" },
  { id: 2, name: "Jane Smith", avatar: "/placeholder.svg", status: "last seen 2 hours ago" },
  // Add more contacts as needed
];

const messages = [
  { id: 1, text: "Hello!", timestamp: "10:00 AM", sent: true },
  { id: 2, text: "Hi there!", timestamp: "10:01 AM", sent: false },
  // Add more messages as needed
];

const Index = () => {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    if (messageText.trim() === "") return;
    // Logic to send message
    setMessageText("");
  };

  return (
    <div className="flex h-full">
      <aside className="w-64 border-r">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <User className="h-6 w-6" />
            <span className="font-semibold">TeleClone</span>
          </div>
          <Button variant="outline" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        <ScrollArea className="flex-1 p-4">
          <Button variant="outline" className="w-full mb-4">New Chat</Button>
          {contacts.map(contact => (
            <div
              key={contact.id}
              className={cn("flex items-center gap-2 p-2 rounded cursor-pointer", selectedContact.id === contact.id && "bg-muted")}
              onClick={() => setSelectedContact(contact)}
            >
              <Avatar>
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>{contact.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold">{contact.name}</span>
                <span className="text-xs text-muted-foreground">{contact.status}</span>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="flex items-center gap-2 p-4 border-t">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">User Name</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={selectedContact.avatar} />
              <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">{selectedContact.name}</span>
              <span className="text-xs text-muted-foreground">{selectedContact.status}</span>
            </div>
          </div>
        </header>
        <ScrollArea className="flex-1 p-4">
          {messages.map(message => (
            <div key={message.id} className={cn("flex flex-col mb-4", message.sent ? "items-end" : "items-start")}>
              <div className={cn("p-2 rounded-lg", message.sent ? "bg-primary text-primary-foreground" : "bg-muted")}>
                {message.text}
              </div>
              <span className="text-xs text-muted-foreground">{message.timestamp}</span>
            </div>
          ))}
        </ScrollArea>
        <div className="flex items-center gap-2 p-4 border-t">
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message"
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={messageText.trim() === ""}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;
