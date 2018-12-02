defmodule Game.NPC.Actions.CommandsSay do
  @moduledoc """
  Speak to the room that the NPC is in
  """

  use Game.Environment

  alias Game.Format
  alias Game.Message
  alias Game.NPC.Events

  @doc """
  Speak to the room
  """
  def act(state, action) do
    message = select_message(action)
    message = Message.npc_say(state.npc, Format.resources(message))

    state.room_id |> @environment.say(Events.npc(state), message)
    Events.broadcast(state.npc, "room/heard", message)

    {:ok, state}
  end

  @doc """
  Select a message to say to the room

  If `message` is present then it is used before `messages`. One of them
  must be present.

      iex> CommandsSay.select_message(%{options: %{message: "hello"}})
      "hello"

      iex> CommandsSay.select_message(%{options: %{message: "hello", messages: []}})
      "hello"

      iex> CommandsSay.select_message(%{options: %{messages: ["hello"]}})
      "hello"
  """
  def select_message(%{options: options}) do
    case Map.has_key?(options, :message) do
      true ->
        options.message

      false ->
        Enum.random(options.messages)
    end
  end
end