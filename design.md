% WebRTC API Design Decisions
This document records (some of) the reasonings that led to the current design of the WebRTC API.
Many of these decisions have been constrained by the need to keep backwards-compatibility with shipping implementations —
they are more often than not the result of a compromise rather than the best we could have.

# Integration with existing telecommunications & conferencing systems
A non-negligible part of the complexity and richness of the WebRTC API derives from the requirement
to make it work with systems built before WebRTC was defined.
The systems may lack some of the optimizations built-in in WebRTC browsers (BUNDLE, Trickle ICE)
and expect a specific format and flow for negotiating media (based on SDP with an offer/answer model).

An application that does not expect to interact with this kind of systems should thus in theory be able to avoid the API surface exposed to control this legacy-interop behavior.

# Exposing more network topology to the browser
Until WebRTC, the only information about the network in which the browser operates that was explicitly exposed to the application developer was the public interface through which the HTTP connection was established.

The possibility of time-based network probes has long exposed the possibility of an attacker to detect the space of private network addresses in which the browser might be operating, including possibly the address of the said browser on the private network and other connected devices.

For browsers with Flash enabled, the Flash plugin exposed more network information to enable its own version of peer-to-peer connection.

Similarly, WebRTC is exposing a lot more network information to application developers to enable finding the best network path for A/V communication.
Since that information can also be used for nefarious purposes
(at the very least, more detailed fingerprinting, in the worse cases, removing the protection from IP-based geolocation afforded by VPNs),
this information is only provided in the case
where the user has already granted access to the mic or camera.

While these two domains of permissions are arguably very distinct,
the Working Group determined that it provided a sufficient signal of trust
while a permission prompt would be unlikely to be meaningful to users.

See [issue 179](https://github.com/webrtc-pc/issues/179).

# Callbacks and promises
At a high level, the WebRTC API offers both a callback- and a promise-based API because the API was developed and started shipping before promise were formalized.
The callback API is considered to be a legacy API.
We define it as a partial interface to isolate it,
and define it in terms of the promise-based API
(see [discussion in pull request 13](https://github.com/w3c/webrtc-pc/pull/13)).
Promises provide not only a nicer way to chain calls,
they also provide a much more robust error management,
and they enable flattened asynchronous programming with the arrival of `async`/`await` in EcmaScript.

# Mix of async & sync
While most of the operations that affect the negotiation process of a `PeerConnection` are asynchronous,
a few are synchronous, notably `addTrack`, `removeTrack` and `close`.
Since the invokation of `addTrack` and `removeTrack` change the states on which the asynchronous operations work, we need to define at which points these states are frozen from the perspective of the async stack.

The asynchronous operations that affect the negotiation process (`createOffer`, `setLocalDescription`, `createAnswer`, `setRemoteDescription`) are queued together following a mixed pattern:
if the queue is empty, the synchronous part of the operation is executed immediately.
Otherwise, it is executed when its gets dequeued.

The reason for that behavior is that the negotiation operations are interpedent (so need to be queued),
but that in general, the sync part of an async operation is executed synchronously
(which we want to preserve in the case where the queue is empty).

See [issue 299](https://github.com/w3c/webrtc-pc/issues/299) and [issue 782]().

# Booleans with `true` as default
In general, it is a bad idea to assign `true` as the default value for a boolean,
since it implies that having the value `undefined` is equivalent to `true`
(where the reverse is expected in JavaScript).
WebRTC has made two exceptions to that rule:

* `ordered` in `RTCDataChannelInit` defaults to true as we realize our mistake after that feature had already shipped

* `voiceActivityDetection` defaults to `true` to avoid the double-negative of `disableVoiceActivityDetection`;
in general, few developers are expected to deal with that setting

See [issue 375](https://github.com/w3c/webrtc-pc/issues/375).

# Agents and states management
To establish a connection, an `RTCPeerConnection` instance relies on agents
that encompass a given part of the protocol stack.

In general, we expose both an aggregated state of each of these agents
(which gives a high level view of the state of the connection)
and a per-line of work state
(which gives more details on the exact state of a particular transaction of the agent).

For a given agent, the aggregated state is defined as a combination of the detailed states.


The ICE agent is responsible for gathering information on the network topology
and finding a network path between the two ends of the connection based on that information.
The agent is fed locally by the browser based on its local network interfaces and the ICE servers (STUN or TURN) it can connect to,
and for the remote peer, by information sent via the signalling channel.


# Error management
At the Web platform level, defining error objects that are more than a `DOMException` with a name has been frown upon.
The general approach to defining errors is thus:

* by default, we use a `DOMException` with a `name` that suffices to distinguish the error from other errors;
if possible we use an existing name defined in WebIDL, if none matches, we request the addition of a name

* if an application develop can programatically get out of the error situation, we use a custom error object modeled after EcmaScript

* in that case, we use a custom attribute that gives enough information for the developer to try and escape from the error situation